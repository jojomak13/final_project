import { Listener, PatientUpdatedEvent, Subjects } from '@hti/common';
import { Message } from 'node-nats-streaming';
import { Patient } from '../../models/Patient';

class PatientUpdatedListener extends Listener<PatientUpdatedEvent> {
  public readonly subject = Subjects.PatientUpdated;
  public queueGroupName = 'timeslot';

  public async onMessage(data: PatientUpdatedEvent['data'], message: Message) {
    const { id, name, email, phone, image } = data;

    const patient = await Patient.findById(id);

    if (!patient) {
      throw new Error();
    }

    console.log(data);
    patient.set({ id, name, email, phone, image });
    await patient.save();

    message.ack();
  }
}

export { PatientUpdatedListener };
