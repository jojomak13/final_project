import { OrderRefundedEvent, Publisher, Subjects } from '@hti/common';

class OrderRefundedPublisher extends Publisher<OrderRefundedEvent> {
  public subject = Subjects.OrderRefunded;
}

export { OrderRefundedPublisher };
