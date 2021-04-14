import { OrderCancelledEvent, Publisher, Subjects } from '@hti/common';

class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  public subject = Subjects.OrderCancelled;
}

export { OrderCancelledPublisher };
