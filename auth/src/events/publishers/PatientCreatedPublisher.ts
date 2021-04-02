import { PatientCreatedEvent, Publisher, Subjects } from '@hti/common';

class PatientCreatedPublisher extends Publisher<PatientCreatedEvent> {
  public subject = Subjects.PatientCreated;
}

export { PatientCreatedPublisher };
