import {
  ExpirationCompleteEvent,
  Listener,
  OrderStatus,
  SendEmailPublisher,
  Subjects,
} from '@hti/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/Order';
import { OrderCancelledPublisher } from '../publishers/OrderCancelledPublisher';
import { queueGroupName } from './queueGroupName';

class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  public readonly subject = Subjects.ExpirationComplete;
  public queueGroupName = queueGroupName;

  public async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId).populate(
      'timeslot patient'
    );

    if (!order) {
      throw new Error('نصيبة سودة');
    }

    if (order.status !== OrderStatus.AwaitPayment) {
      return msg.ack();
    }

    order.set('status', OrderStatus.Canelled);
    order.timeslot.is_booked = false;

    await order.save();
    await order.timeslot.save();

    new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
    });

    new SendEmailPublisher(this.client).publish({
      to: `${order.patient.email}`,
      subject: 'Session Trial Time Expired',
      body: 'Your session cancelled',
    });

    msg.ack();
  }
}

export { ExpirationCompleteListener };
