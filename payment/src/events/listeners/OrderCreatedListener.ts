import { Listener, OrderCreatedEvent, Subjects } from '@hti/common';
import { Message } from 'node-nats-streaming';
import { QueueGroupName } from '../QueueGroupName';
import { Order } from '../../models/Order';

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  public readonly subject = Subjects.OrderCreated;
  public queueGroupName = QueueGroupName;

  public async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      status: data.satatus,
      price: data.price,
      version: data.version,
    });

    await order.save();

    msg.ack();
  }
}

export { OrderCreatedListener };
