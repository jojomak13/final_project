import { OrderCreatedEvent, Publisher, Subjects } from '@hti/common';

class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  public subject = Subjects.OrderCreated;
}

export { OrderCreatedPublisher };
