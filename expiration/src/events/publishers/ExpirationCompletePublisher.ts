import { ExpirationCompleteEvent, Publisher, Subjects } from '@hti/common';

class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  public subject = Subjects.ExpirationComplete;
}

export { ExpirationCompletePublisher };
