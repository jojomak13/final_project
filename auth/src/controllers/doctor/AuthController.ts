import { refreshTokenPayload } from '../../helpers/Auth';
import { BadRequestError, DBValidationError, natsWrapper } from '@hti/common';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Password } from '../../helpers/password';
import { Doctor } from '../../models/Doctor';
import { DoctorApprovedPublisher } from '../../events/publishers/DoctorApprovedPublisher';
import { DoctorCreatedPublisher } from '../../events/publishers/DoctorCreatedPublisher';

export const signup = async (data: any, _req: Request, res: Response) => {
  const doctor = await Doctor.findOne().or([
    { email: data.email },
    { phone: data.phone },
  ]);

  if (doctor) {
    const errors = [];

    if (data.email === doctor.email)
      errors.push({ message: 'email already exist', field: 'email' });
    if (data.phone === doctor.phone)
      errors.push({ message: 'phone already exist', field: 'phone' });

    throw new DBValidationError(errors);
  }

  const newDoctor = Doctor.build(data);
  await newDoctor.save();

  // TODO:: move this to admin
  const publisher = new DoctorApprovedPublisher(natsWrapper.client);
  await publisher.publish({
    id: newDoctor.id,
    name: newDoctor.name,
    title: newDoctor.title,
    email: newDoctor.email,
    phone: newDoctor.phone,
    fees: newDoctor.fees,
    prefix: newDoctor.prefix,
    image: newDoctor.image,
  });

  new DoctorCreatedPublisher(natsWrapper.client).publish({
    name: newDoctor.name,
    email: newDoctor.email,
    phone: newDoctor.phone,
  });

  return res.status(201).json({
    status: true,
    msg: 'acount created successfully',
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const doctor = await Doctor.findOne({ email }).populate('country');

  if (!doctor || !(await Password.compare(password, doctor.password))) {
    throw new BadRequestError('Invalid Credentials');
  }

  res.json({ status: true, data: doctor.login() });
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

    const doctor = await Doctor.findById(payload.id).populate('country');

    if (!doctor || doctor.email !== payload.email) {
      throw new BadRequestError('Not Authorized', 401);
    }

    res.json({ status: true, data: doctor.login() });
  } catch (err) {
    throw new BadRequestError('Invalid or Expired Refresh Token', 400);
  }
};
