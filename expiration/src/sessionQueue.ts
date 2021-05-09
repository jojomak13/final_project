import Queue from 'bull';

interface Payload {
  order: {
    id: string;
    version: number;
  };
  timeslot: {
    startTime: Date;
    endTime: Date;
  };
}

const sessionQueue = new Queue<Payload>('session', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

sessionQueue.process(async (job) => {
  // send publisher to start order

  console.log('Session Started 😂');
});

export { sessionQueue };
