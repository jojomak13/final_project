import { refreshTokenPayload } from '../../helpers/Auth';
import { BadRequestError, DBValidationError, natsWrapper } from '@hti/common';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Password } from '../../helpers/password';
import { Patient } from '../../models/Patient';
import { PatientCreatedPublisher } from '../../events/publishers/PatientCreatedPublisher';

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

  const publisher = new PatientCreatedPublisher(natsWrapper.client);
  await publisher.publish({
    id: newPatient.id,
    name: newPatient.name,
    email: newPatient.email,
    phone: newPatient.phone,
    image: newPatient.image,
  });

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

  res.json({ status: true, data: patient.login() });
};

export const me = async (req: Request, res: Response) => {
  return res.json({
    status: true,
    data: req.user,
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refresh_token } = req.body;

  try {
    const payload = jwt.verify(
      refresh_token,
      process.env.APP_KEY!
    ) as refreshTokenPayload;

    const patient = await Patient.findById(payload.id).populate('country');

    if (!patient || patient.email !== payload.email) {
      throw new BadRequestError('Not Authorized', 401);
    }

    res.json({ status: true, data: patient.login() });
  } catch (err) {
    throw new BadRequestError('Invalid or Expired Refresh Token', 400);
  }
};
