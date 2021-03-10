import { BadRequestError } from '@hti/common';
import { Request, Response } from 'express';
import { Password } from '../../helpers/password';
import { Patient } from '../../models/Patient';

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

  await patient.updateOne(data);

  res.json({ status: true, msg: 'profile updated successfully' });
};
