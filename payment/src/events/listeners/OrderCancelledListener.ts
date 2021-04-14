import {
  Listener,
  NotFoundError,
  OrderCancelledEvent,
  OrderStatus,
  Subjects,
} from '@hti/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/Order';
import { QueueGroupName } from '../QueueGroupName';

class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  public readonly subject = Subjects.OrderCancelled;
  public queueGroupName = QueueGroupName;

  public async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new NotFoundError();
    }

    order.set({ status: OrderStatus.Canelled });
    await order.save();

    msg.ack();
  }
}

export { OrderCancelledListener };
