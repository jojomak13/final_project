import { BadRequestError, NotFoundError, OrderStatus } from '@hti/common';
import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { Patient } from '../models/Patient';
import { Timeslot } from '../models/Timeslot';

export const store = async (data: any, req: Request, res: Response) => {
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

  const order = Order.build({
    timeslot,
    patient,
    type: data.type,
    status: OrderStatus.AwaitPayment,
    expires_at: expiration,
  });

  await order.save();
  await timeslot.save();

  res.status(201).json({
    status: true,
    msg: 'time slot booked successfully',
  });
};

export const schedule = async (req: Request, res: Response) => {
  //
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

  // TODO:: created refund logic here

  return res.json({
    status: true,
    msg: 'order cancelled successfully',
  });
};
