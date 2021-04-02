import { BadRequestError, natsWrapper } from '@hti/common';
import { Request, Response } from 'express';
import { PatientUpdatedPublisher } from '../../events/publishers/patientUpdatedPublisher';
import { Password } from '../../helpers/password';
import { Patient } from '../../models/Patient';

export const edit = async (req: Request, res: Response) => {
  const patient = await Patient.findById(req.user?.id).populate('country');

  if (!patient) {
    throw new BadRequestError('oops, somthing went wrong');
  }

  res.json({ status: true, data: patient });
};

export const update = async (data: any, req: Request, res: Response) => {
  const patient = await Patient.findById(req.user?.id);

  if (!patient) {
    throw new BadRequestError('oops, somthing went wrong');
  }

  if (data.password) {
    data = {
      ...data,
      password: await Password.hash(data.password),
    };
  }

  patient.set(data);

  await patient.save();

  const publisher = new PatientUpdatedPublisher(natsWrapper.client);
  await publisher.publish({
    id: patient.id,
    name: patient.name,
    email: patient.email,
    phone: patient.phone,
    image: patient.image,
  });

  res.json({ status: true, msg: 'profile updated successfully' });
};
