import {
  Listener,
  NotFoundError,
  OrderUpdatedEvent,
  Subjects,
} from '@hti/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/Order';
import { QueueGroupName } from '../QueueGroupName';

class OrderUpdatedListener extends Listener<OrderUpdatedEvent> {
  public readonly subject = Subjects.OrderUpdated;
  public queueGroupName = QueueGroupName;

  public async onMessage(data: OrderUpdatedEvent['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new NotFoundError();
    }

    await order.save();

    msg.ack();
  }
}

export { OrderUpdatedListener };
