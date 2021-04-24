import { Listener, SendEmailEvent, Subjects } from '@hti/common';
import { Message } from 'node-nats-streaming';
import { mail } from '../../Mailer';
import { queueGroupName } from '../queueGroupName';

class SendEmailListener extends Listener<SendEmailEvent> {
  public readonly subject = Subjects.SendEmail;
  public queueGroupName = queueGroupName;

  public async onMessage(data: SendEmailEvent['data'], msg: Message) {
    mail.sendTo(data.to, {
      subject: data.subject,
      body: data.body,
    });

    msg.ack();
  }
}

export { SendEmailListener };
