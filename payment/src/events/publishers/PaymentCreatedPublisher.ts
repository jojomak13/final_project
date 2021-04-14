import { PaymentCreatedEvent, Publisher, Subjects } from '@hti/common';

class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}

export { PaymentCreatedPublisher };
