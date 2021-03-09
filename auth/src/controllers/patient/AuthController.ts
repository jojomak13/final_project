import { BadRequestError } from '@hti/common';
import { Request, Response } from 'express';
import { Patient } from '../../models/patient';


export const signup = async (data: any, req: Request, res: Response) => {
  console.log(data);

  const patient = await Patient.findOne({ email: data.email, phone: data.phone });
  if (patient) {
    throw new BadRequestError('email already exist', req.statusCode);
  }

  const newPatient = Patient.build(data);
  await newPatient.save();

  return newPatient;
};
