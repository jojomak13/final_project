import { Request, Response } from 'express';
import { Patient } from '../../models/Patient';

export const signup = async (data: Object, req: Request, res: Response) => {
  console.log(data);
  res.json('done');
  // const patient = await Patient.findOne({ email: req.email });
  // if (patient) {
  // TODO
  // throw error already exsist
  // }
  // TODO
  // make new patient
};
