import { Listener, PatientCreatedEvent, Subjects } from '@hti/common';
import { Message } from 'node-nats-streaming';
import { Patient } from '../../models/Patient';
import { queueGroupName } from './queueGroupName';

class PatientCreatedListener extends Listener<PatientCreatedEvent> {
  public readonly subject = Subjects.PatientCreated;
  public queueGroupName = queueGroupName;

  public async onMessage(data: PatientCreatedEvent['data'], message: Message) {
    const patient = Patient.build(data);

    await patient.save();

    message.ack();
  }
}

export { PatientCreatedListener };
