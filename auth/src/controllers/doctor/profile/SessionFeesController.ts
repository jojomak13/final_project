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
  const doctor = await Doctor.findById(req.user?.id);

  if (!doctor) {
    throw new BadRequestError('oops, somthing went wrong');
  }

  const timeDif =
    Math.abs(new Date().getTime() - doctor.fees_updated_at.getTime()) /
    (1000 * 60 * 60 * 24 * 365);

  if (timeDif >= 1.0) {
    doctor.set('new_fees', data);
    doctor.set('fees_updated_at', new Date().toISOString());
    await doctor.save();
    return res.json({
      status: true,
      msg: 'updated fees going to reviewed by admins',
    });
  }

  return res.status(400).json({
    status: false,
    msg: 'oops, you can updete your fess once per year',
  });
};
