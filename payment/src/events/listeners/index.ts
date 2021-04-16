import { natsWrapper } from '@hti/common';
import { OrderCancelledListener } from './OrderCancelledListener';
import { OrderCreatedListener } from './OrderCreatedListener';
import { OrderRefundedListener } from './OrderRefundedListener';
import { OrderUpdatedListener } from './OrderUpdatedListener';

const load = () => {
  const client = natsWrapper.client;

  new OrderCreatedListener(client).listen();
  new OrderRefundedListener(client).listen();
  new OrderCancelledListener(client).listen();
  new OrderUpdatedListener(client).listen();
};

export default load;
