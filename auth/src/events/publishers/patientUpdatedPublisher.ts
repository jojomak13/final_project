import { PatientUpdatedEvent, Publisher, Subjects } from '@hti/common';

class PatientUpdatedPublisher extends Publisher<PatientUpdatedEvent> {
  public subject = Subjects.PatientUpdated;
}

export { PatientUpdatedPublisher };
