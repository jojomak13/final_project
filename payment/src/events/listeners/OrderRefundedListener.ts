import {
  Listener,
  NotFoundError,
  OrderRefundedEvent,
  OrderStatus,
  Subjects,
} from '@hti/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/Order';
import { Payment, providerType, statusType } from '../../models/Payment';
import { QueueGroupName } from '../QueueGroupName';

class OrderRefundedListener extends Listener<OrderRefundedEvent> {
  public readonly subject = Subjects.OrderRefunded;
  public queueGroupName = QueueGroupName;

  public async onMessage(data: OrderRefundedEvent['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new NotFoundError();
    }

    const payment = await Payment.findOne({ order: order });
    if (!payment) {
      throw new Error('ops, somthing went wrong');
    }

    const refund = await payment.refund();

    const newPayment = Payment.build({
      order,
      provider: providerType.STRIPE,
      provider_id: refund.id,
      status: statusType.REFUND,
    });

    order.set('status', OrderStatus.PaymentRefund);

    await order.save();
    await newPayment.save();

    msg.ack();
  }
}

export { OrderRefundedListener };
