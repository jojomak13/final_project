import { natsWrapper } from '@hti/common';
import { DoctorApprovedListener } from './DoctorApprovedListener';
import { DoctorUpdatedListener } from './DoctorUpdatedListener';
import { ExpirationCompleteListener } from './ExpirationCompleteListener';
import { PatientCreatedListener } from './PatientCreatedListener';
import { PatientUpdatedListener } from './PatientUpdatedListener';
import { PaymentCreatedListener } from './PaymentCreatedListener';

const load = () => {
  const client = natsWrapper.client;

  new PatientCreatedListener(client).listen();
  new PatientUpdatedListener(client).listen();

  new DoctorApprovedListener(client).listen();
  new DoctorUpdatedListener(client).listen();

  new ExpirationCompleteListener(client).listen();

  new PaymentCreatedListener(client).listen();
};

export default load;
