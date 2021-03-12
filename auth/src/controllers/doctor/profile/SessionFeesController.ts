import { BadRequestError } from '@hti/common';
import { Request, Response } from 'express';
import { Doctor } from '../../../models/Doctor';

export const edit = async (req: Request, res: Response) => {
  const fees = await Doctor.findById(req.user?.id).select('fees');

  if (!fees) {
    throw new BadRequestError('oops, somthing went wrong');
  }

  res.json({ status: true, data: fees });
};

export const update = async (data: any, req: Request, res: Response) => {
  const fees = await Doctor.findById(req.user?.id);

  if (!fees) {
    throw new BadRequestError('oops, somthing went wrong');
  }

  await Doctor.updateOne(data);

  res.json({ status: true, msg: 'about me updated successfully' });
};
