import { DoctorCreatedEvent, Publisher, Subjects } from '@hti/common';

class DoctorCreatedPublisher extends Publisher<DoctorCreatedEvent> {
  public subject = Subjects.DoctorCreated;
}

export { DoctorCreatedPublisher };
