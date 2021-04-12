import { Listener, DoctorApprovedEvent, Subjects } from '@hti/common';
import { Message } from 'node-nats-streaming';
import { Doctor } from '../../models/Doctor';
import { queueGroupName } from './queueGroupName';

class DoctorApprovedListener extends Listener<DoctorApprovedEvent> {
  public readonly subject = Subjects.DoctorApproved;
  public queueGroupName = queueGroupName;

  public async onMessage(data: DoctorApprovedEvent['data'], message: Message) {
    const doctor = Doctor.build(data);

    await doctor.save();

    message.ack();
  }
}

export { DoctorApprovedListener };
