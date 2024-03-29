import { Listener, Subjects, DoctorUpdatedEvent } from '@hti/common';
import { Message } from 'node-nats-streaming';
import { Doctor } from '../../models/Doctor';
import { queueGroupName } from './queueGroupName';

class DoctorUpdatedListener extends Listener<DoctorUpdatedEvent> {
  public readonly subject = Subjects.DoctorUpdated;
  public queueGroupName = queueGroupName;

  public async onMessage(data: DoctorUpdatedEvent['data'], message: Message) {
    const doctor = await Doctor.findById(data.id);

    if (!doctor) {
      throw new Error();
    }

    doctor.set(data);

    await doctor.save();

    message.ack();
  }
}

export { DoctorUpdatedListener };
