import { BadRequestError, natsWrapper } from '@hti/common';
import { Request, Response } from 'express';
import { DoctorUpdatedPublisher } from '../../../events/publishers/DoctorUpdatedPublisher';
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

  doctorAboutme.set(data);

  await doctorAboutme.save();

  const publisher = new DoctorUpdatedPublisher(natsWrapper.client);
  await publisher.publish({
    id: doctorAboutme.id,
    title: doctorAboutme.title,
    prefix: doctorAboutme.prefix,
  });

  res.json({ status: true, msg: 'about me updated successfully' });
};
