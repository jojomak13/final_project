import { BadRequestError } from '@hti/common';
import { Request, Response } from 'express';
import { Doctor } from '../../../models/Doctor';

export const edit = async (req: Request, res: Response) => {
  const AboutDoctor = await Doctor.findById(req.user?.id).select([
    'title',
    'biography',
    'prefix',
    'languages',
    'specializations',
    'main_focus',
  ]);

  if (!AboutDoctor) {
    throw new BadRequestError('oops, somthing went wrong');
  }

  res.json({ status: true, data: AboutDoctor });
};

export const update = async (data: any, req: Request, res: Response) => {
  const doctorAboutme = await Doctor.findById(req.user?.id);

  if (!doctorAboutme) {
    throw new BadRequestError('oops, somthing went wrong');
  }

  await Doctor.updateOne(data);

  res.json({ status: true, msg: 'about me updated successfully' });
};
