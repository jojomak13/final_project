import {
  BadRequestError,
  natsWrapper,
  NotFoundError,
  OrderStatus,
} from '@hti/common';
import { Request, Response } from 'express';
import { OrderCreatedPublisher } from '../events/publishers/OrderCreatedPublisher';
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

  res.status(201).json({
    status: true,
    msg: 'time slot booked successfully',
  });
};

export const reschedule = async (data: any, req: Request, res: Response) => {
  //create new order
  const timeslot = await Timeslot.findById(data.timeslot);
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

  const newOrder = Order.build({
    timeslot,
    patient,
    type: data.type,
    status: OrderStatus.AwaitPayment,
    expires_at: expiration,
  });

  // cancel old order
  const oldOrder = await Order.findById(req.params.id).populate('timeslot');

  if (
    !oldOrder ||
    !oldOrder.isValidReschedule(timeslot) ||
    oldOrder.patient.toString() !== req.user?.id
  ) {
    throw new NotFoundError();
  }

  if (oldOrder.status === OrderStatus.Canelled) {
    throw new BadRequestError('this order already cancelled before');
  }

  oldOrder.set({ status: OrderStatus.Canelled });
  oldOrder.timeslot.set({ is_booked: false });

  // save new order data
  await newOrder.save();
  await timeslot.save();

  // save old order cancelation
  await oldOrder.save();
  await oldOrder.timeslot.save();

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

  if (order.status === OrderStatus.Canelled) {
    throw new BadRequestError('this order already cancelled before');
  }

  order.set({ status: OrderStatus.Canelled });
  order.timeslot.set({ is_booked: false });

  await order.save();
  await order.timeslot.save();

  // TODO:: created refund logic here dor canacel

  return res.json({
    status: true,
    msg: 'order cancelled successfully',
  });
};
