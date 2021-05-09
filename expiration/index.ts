import { natsWrapper } from '@hti/common';
import { OrderCreatedListener } from './src/events/listeners/OrderCreatedListener';
import { OrderStartListener } from './src/events/listeners/OrderStartListener';

const setup = async () => {
  const envKey = [
    'NATS_CLUSTER_ID',
    'NATS_CLIENT_ID',
    'NATS_URL',
    'REDIS_HOST',
  ];

  try {
    envKey.forEach((key) => {
      if (!process.env[key]) {
        throw new Error(`[${key}] not found`);
      }
    });

    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID!,
      process.env.NATS_CLIENT_ID!,
      process.env.NATS_URL!
    );
    console.log('[info] nats connection open.');

    natsWrapper.client.on('colse', () => {
      console.log('NATS connection closed');
      process.exit();
    });

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderStartListener(natsWrapper.client).listen();
  } catch (err) {
    console.log(err.message);
  }
};

setup();
