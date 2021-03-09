import { Patient } from '../../models/Patient';

export const signup = async (req: any) => {
  const patient = await Patient.findOne({ email: req.email });
  if (patient) {
    // TODO
    // throw error already exsist
  }
  // TODO
  // make new patient
};
