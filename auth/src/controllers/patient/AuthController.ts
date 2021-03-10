import { BadRequestError } from '@hti/common';
import { Request, Response } from 'express';
import { Country } from '../../models/Country';
import { Patient } from '../../models/Patient';


export const signup = async (data: any, req: Request, res: Response) => {
  console.log(data);

  const newCountry = Country.build({ code: "123", currency: "132", name: "gremany", timezone: "45" })
  await newCountry.save();

  const patient = await Patient.findOne({ email: data.email, phone: data.phone });
  if (patient) {
    throw new BadRequestError('email already exist', req.statusCode);
  }

  const newPatient = Patient.build(data);
  await newPatient.save();

  res.send('acount created successfully');

  return newPatient;

};
