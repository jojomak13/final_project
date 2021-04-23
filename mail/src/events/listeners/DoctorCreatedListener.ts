import { DoctorCreatedEvent, Listener, Subjects } from '@hti/common';
import { Message } from 'node-nats-streaming';
import { mail } from '../../Mailer';
import { queueGroupName } from '../queueGroupName';

class DoctorCreatedListener extends Listener<DoctorCreatedEvent> {
  public readonly subject = Subjects.DoctorCreated;
  public queueGroupName = queueGroupName;

  public async onMessage(data: DoctorCreatedEvent['data'], msg: Message) {
    mail.sendTo(data.email, {
      subject: 'Doctor Created',
      body: 'welcome welcome',
    });

    msg.ack();
  }
}

export { DoctorCreatedListener };
