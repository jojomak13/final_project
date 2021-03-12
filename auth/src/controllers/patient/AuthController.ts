import { BadRequestError, DBValidationError } from '@hti/common';
import { Request, Response } from 'express';
import { Password } from '../../helpers/password';
import { Patient } from '../../models/Patient';

export const signup = async (data: any, req: Request, res: Response) => {
  const patient = await Patient.findOne().or([
    { email: data.email },
    { phone: data.phone },
  ]);

  if (patient) {
    const errors = [];

    if (data.email === patient.email)
      errors.push({ message: 'email already exist', field: 'email' });
    if (data.phone === patient.phone)
      errors.push({ message: 'phone already exist', field: 'phone' });

    throw new DBValidationError(errors);
  }

  const newPatient = Patient.build(data);
  await newPatient.save();

  return res.status(201).json({
    status: true,
    msg: 'acount created successfully',
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const patient = await Patient.findOne({ email }).populate('country');

  if (!patient || !(await Password.compare(password, patient.password))) {
    throw new BadRequestError('Invalid Credentials');
  }

  const token = await patient.login();

  res.json({ status: true, data: { token } });
};

export const me = async (req: Request, res: Response) => {
  return res.json({
    status: true,
    data: req.user,
  });
};
