import { OrderStartEvent, Publisher, Subjects } from '@hti/common';

class OrderStartPublisher extends Publisher<OrderStartEvent> {
  public subject = Subjects.OrderStart;
}

export { OrderStartPublisher };
