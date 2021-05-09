import {
  Listener,
  NotFoundError,
  OrderStatus,
  PaymentCreatedEvent,
  Subjects,
} from '@hti/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/Order';
import { OrderStartPublisher } from '../publishers/OrderStartPublisher';
import { queueGroupName } from './queueGroupName';

class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  public readonly subject = Subjects.PaymentCreated;
  public queueGroupName = queueGroupName;

  public async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    }).populate('timeslot');

    if (!order) {
      throw new NotFoundError();
    }

    order.set('status', OrderStatus.PaymentComplete);
    await order.save();

    new OrderStartPublisher(this.client).publish({
      order: {
        id: order.id,
        version: order.version,
      },
      timeslot: {
        startTime: order.timeslot.start_time,
        endTime: order.timeslot.end_time,
      },
    });

    msg.ack();
  }
}

export { PaymentCreatedListener };
