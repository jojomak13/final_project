import {
  BadRequestError,
  natsWrapper,
  NotFoundError,
  OrderStatus,
  SendEmailPublisher,
} from '@hti/common';
import { Request, Response } from 'express';
import { OrderCancelledPublisher } from '../events/publishers/OrderCancelledPublisher';
import { OrderCreatedPublisher } from '../events/publishers/OrderCreatedPublisher';
import { OrderRefundedPublisher } from '../events/publishers/OrderRefundedPublisher';
import { OrderUpdatedPublisher } from '../events/publishers/OrderUpdatedPublisher';
import { Order } from '../models/Order';
import { Patient } from '../models/Patient';
import { Timeslot } from '../models/Timeslot';

export const store = async (data: any, req: Request, res: Response) => {
  const timeslot = await Timeslot.findById(data.timeslot).populate('doctor');
  const patient = await Patient.findById(req.user?.id);

  if (!timeslot) throw new NotFoundError();

  if (timeslot.is_booked) {
    throw new BadRequestError('This time slot already reserved before');
  }

  if (!patient) {
    throw new Error(
      `patient [${req.user?.id}] not found inside timeslot service`
    );
  }

  const expiration = new Date();
  expiration.setSeconds(
    expiration.getSeconds() + parseInt(process.env.ORDER_EXPIRED_PERIOD!)
  );

  timeslot.set({ is_booked: true });

  const order = Order.build({
    timeslot,
    patient,
    type: data.type,
    status: OrderStatus.AwaitPayment,
    expires_at: expiration,
  });

  order.setPrice(timeslot, req.body.type, req.user!.country.name);

  await order.save();
  await timeslot.save();

  new OrderCreatedPublisher(natsWrapper.client).publish({
    id: order.id,
    patient_id: order.patient.toString(),
    status: order.status,
    price: order.price,
    expiresAt: order.expires_at,
    version: order.version,
  });

  new SendEmailPublisher(natsWrapper.client).publish({
    to: `${timeslot.doctor.email}, ${patient.email}`,
    subject: 'New session booked',
    body: `timeslot booked by ${patient.name} with Dr.${timeslot.doctor.name[0].value}`,
  });

  res.status(201).json({
    status: true,
    msg: 'time slot booked successfully',
  });
};

export const reschedule = async (data: any, req: Request, res: Response) => {
  const timeslot = await Timeslot.findById(data.timeslot);
  const patient = await Patient.findById(req.user?.id);
  const order = await Order.findById(req.params.id).populate('timeslot');

  if (!patient) {
    throw new Error(
      `patient [${req.user?.id}] not found inside timeslot service`
    );
  }

  if (!timeslot || !order) throw new NotFoundError();

  if (
    !order.isValidReschedule(timeslot) ||
    order.patient.toString() !== req.user?.id
  ) {
    throw new NotFoundError();
  }

  if (!order.canReschedule(timeslot)) {
    throw new BadRequestError(
      "You can't reschedule a session starts before 6 hours"
    );
  }

  if (timeslot.is_booked)
    throw new BadRequestError('This time slot already reserved before');

  if (order?.timeslot.duration !== timeslot.duration) {
    throw new BadRequestError(
      `You have to book duration of ${order?.timeslot.duration} minutes`
    );
  }

  timeslot.set({ is_booked: true });
  await timeslot.save();

  order.timeslot.set({ is_booked: false });
  await order.timeslot.save();

  order.set({ timeslot });
  await order.save();

  new OrderUpdatedPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
  });

  new SendEmailPublisher(natsWrapper.client).publish({
    to: `${patient.email}, ${timeslot.doctor.email}`,
    subject: 'Session Rescheduled',
    body: `Session rescheduled to ${timeslot.start_time}`,
  });

  return res.json({
    status: true,
    msg: 'order rescheduled successfully',
  });
};

export const cancel = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate('timeslot');

  if (!order || order.patient.toString() !== req.user?.id) {
    throw new NotFoundError();
  }

  if (
    order.status === OrderStatus.Canelled ||
    order.status === OrderStatus.PaymentRefund
  ) {
    throw new BadRequestError('this order already cancelled before');
  }

  if (order.status === OrderStatus.PaymentComplete) {
    throw new BadRequestError('this order finished before');
  }

  let isRefunded = true;

  if (order.canRefund(order.timeslot)) {
    order.set({ status: OrderStatus.PaymentRefund });
  } else {
    isRefunded = false;
    order.set({ status: OrderStatus.Canelled });
  }

  order.timeslot.set({ is_booked: false });
  await order.timeslot.save();
  await order.save();

  const publisherData = {
    id: order.id,
    version: order.version,
  };

  if (isRefunded) {
    new OrderRefundedPublisher(natsWrapper.client).publish(publisherData);
  } else {
    new OrderCancelledPublisher(natsWrapper.client).publish(publisherData);
  }

  return res.json({
    status: true,
    msg: `order cancelled successfully${isRefunded ? ' with refund' : ''}`,
  });
};
