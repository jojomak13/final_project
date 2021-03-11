import { BadRequestError, DBValidationError } from '@hti/common';
import { Request, Response } from 'express';
import { Password } from '../../helpers/password';
import { Patient } from '../../models/Patient';
import jwt from 'jsonwebtoken';

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

  const patient = await Patient.findOne({ email });

  if (!patient || !(await Password.compare(password, patient.password))) {
    throw new BadRequestError('Invalid Credentials');
  }

  const token = await jwt.sign(
    {
      id: patient.id,
      email: patient.email,
    },
    process.env.APP_KEY!
  );

  res.json({ status: true, data: { token } });
};

export const me = async (req: Request, res: Response) => {
  const patient = await Patient.findById(req.user?.id).populate(
    'country',
    'name timezone'
  );

  return res.json({
    status: true,
    data: patient,
  });
};
