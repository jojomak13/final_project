import { Listener, natsWrapper } from '@hti/common';
import { mail } from './src/Mailer';
import Listeners from './src/events/listeners';

const setup = async () => {
  const envKey = ['NATS_CLUSTER_ID', 'NATS_CLIENT_ID', 'NATS_URL'];

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

    mail.connect({
      user: 'e65238ba4ed6c6',
      pass: '52eacdb9b27339',
    });

    // Start Listeners
    Listeners();

    console.log('[Mail] service running');
  } catch (err) {
    console.log(err.message);
  }
};

setup();
