import { OrderUpdatedEvent, Publisher, Subjects } from '@hti/common';

class OrderUpdatedPublisher extends Publisher<OrderUpdatedEvent> {
  public subject = Subjects.OrderUpdated;
}

export { OrderUpdatedPublisher };
