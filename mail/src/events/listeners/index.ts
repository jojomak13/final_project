import { natsWrapper } from '@hti/common';
import { DoctorCreatedListener } from './DoctorCreatedListener';

const load = () => {
  const client = natsWrapper.client;

  new DoctorCreatedListener(client).listen();
};

export default load;
