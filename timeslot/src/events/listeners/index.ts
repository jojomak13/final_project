import { natsWrapper } from '@hti/common';
import { DoctorApprovedListener } from './DoctorApprovedListener';
import { DoctorUpdatedListener } from './DoctorUpdatedListener';
import { PatientCreatedListener } from './PatientCreatedListener';
import { PatientUpdatedListener } from './PatientUpdatedListener';

const load = () => {
  const client = natsWrapper.client;

  new PatientCreatedListener(client).listen();
  new PatientUpdatedListener(client).listen();

  new DoctorApprovedListener(client).listen();
  new DoctorUpdatedListener(client).listen();
};

export default load;
