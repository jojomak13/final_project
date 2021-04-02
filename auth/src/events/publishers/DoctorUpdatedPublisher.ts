import { DoctorUpdatedEvent, Publisher, Subjects } from '@hti/common';

class DoctorUpdatedPublisher extends Publisher<DoctorUpdatedEvent> {
  public subject = Subjects.DoctorUpdated;
}

export { DoctorUpdatedPublisher };
