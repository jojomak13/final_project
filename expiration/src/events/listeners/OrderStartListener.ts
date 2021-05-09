import { Listener, OrderStartEvent, Subjects } from '@hti/common';
import moment from 'moment';
import { Message } from 'node-nats-streaming';
import { sessionQueue } from '../../sessionQueue';

class OrderStartListener extends Listener<OrderStartEvent> {
  public readonly subject = Subjects.OrderStart;
  public queueGroupName = 'expiration-service';

  public async onMessage(data: OrderStartEvent['data'], msg: Message) {

    const delay = new Date(data.timeslot.startTime).getTime() - new Date().getTime();

    console.log('delay', delay);

    await sessionQueue.add(data, { delay });

    msg.ack();
  }
}

export { OrderStartListener };
