import {
  BadRequestError,
  natsWrapper,
  NotFoundError,
  OrderStatus,
} from '@hti/common';
import { Request, Response } from 'express';
import { PaymentCreatedPublisher } from '../events/publishers/PaymentCreatedPublisher';
import { Order } from '../models/Order';
import { Payment, providerType } from '../models/Payment';
import { stripe } from '../stripe';

export const checkout = async (req: Request, res: Response) => {
  const { stripeToken } = req.body;

  const order = await Order.findById(req.params.id);

  if (!stripeToken || !order) throw new NotFoundError();

  if (order.status !== OrderStatus.AwaitPayment) {
    throw new BadRequestError('this order already paid or cancelled before');
  }

  if (order.patient_id !== req.user?.id) {
    throw new BadRequestError('not authorized', 401);
  }

  order.set('status', OrderStatus.PaymentComplete);

  const charge = await stripe.charges.create({
    source: stripeToken,
    amount: order.price.amount * 100,
    currency: order.price.currency,
  });

  const payment = Payment.build({
    order: order,
    provider: providerType.STRIPE,
    provider_id: charge.id,
  });

  await payment.save();
  await order.save();

  new PaymentCreatedPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
  });

  res.status(201).json({
    status: true,
    msg: 'Payment created successfully',
  });
};
