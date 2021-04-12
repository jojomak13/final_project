import {
  ExpirationCompleteEvent,
  Listener,
  OrderStatus,
  Subjects,
} from '@hti/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/Order';
import { queueGroupName } from './queueGroupName';

class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  public readonly subject = Subjects.ExpirationComplete;
  public queueGroupName = queueGroupName;

  public async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId).populate('timeslot');

    if (!order) {
      throw new Error('نصيبة سودة');
    }

    if (order.status === OrderStatus.PaymentComplete) {
      return msg.ack();
    }

    order.set('status', OrderStatus.Canelled);
    order.timeslot.is_booked = false;

    await order.save();
    await order.timeslot.save();

    msg.ack();
  }
}

export { ExpirationCompleteListener };
