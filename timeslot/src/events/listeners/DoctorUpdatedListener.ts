import { Listener, Subjects, DoctorUpdatedEvent } from '@hti/common';
import { Message } from 'node-nats-streaming';
import { Doctor } from '../../models/Doctor';

class DoctorUpdatedListener extends Listener<DoctorUpdatedEvent> {
  public readonly subject = Subjects.DoctorUpdated;
  public queueGroupName = 'timeslot';

  public async onMessage(data: DoctorUpdatedEvent['data'], message: Message) {
    // const doctor = 

    // await doctor.save();

    console.log(data);

    message.ack();
  }
}

export { DoctorUpdatedListener };
