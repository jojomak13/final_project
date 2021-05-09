import { Listener, OrderStartEvent, Subjects } from '@hti/common';
import moment from 'moment';
import { Message } from 'node-nats-streaming';
import { sessionQueue } from '../../sessionQueue';

class OrderStartListener extends Listener<OrderStartEvent> {
  public readonly subject = Subjects.OrderStart;
  public queueGroupName = 'expiration-service';

  public async onMessage(data: OrderStartEvent['data'], msg: Message) {
    const startTime = moment(data.timeslot.startTime);
    const timeNow = moment(new Date());

    console.log('start time', startTime.format('hh:mm:ss a Z'));
    console.log('time now', timeNow.format('hh:mm:ss a Z'));

    const delay = startTime.diff(timeNow);

    console.log('delay', delay);

    await sessionQueue.add(data, { delay });

    msg.ack();
  }
}

export { OrderStartListener };
