import { DoctorApprovedEvent, Publisher, Subjects } from '@hti/common';

class DoctorApprovedPublisher extends Publisher<DoctorApprovedEvent> {
  public subject = Subjects.DoctorApproved;
}

export { DoctorApprovedPublisher };
