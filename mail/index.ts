import { natsWrapper } from '@hti/common';
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
  } catch (err) {
    console.log(err.message);
  }
};

setup();
