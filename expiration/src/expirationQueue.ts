import { natsWrapper } from '@hti/common';
import Queue from 'bull';
import { ExpirationCompletePublisher } from './events/publishers/ExpirationCompletePublisher';

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  // publish event of type [ExpirationCompletePublisher]
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });
});

export { expirationQueue };
