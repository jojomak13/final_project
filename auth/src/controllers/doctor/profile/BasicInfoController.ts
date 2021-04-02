import { BadRequestError, natsWrapper } from '@hti/common';
import { Request, Response } from 'express';
import { DoctorUpdatedPublisher } from '../../../events/publishers/DoctorUpdatedPublisher';
import { Password } from '../../../helpers/password';
import { Doctor } from '../../../models/Doctor';

export const edit = async (req: Request, res: Response) => {
  const doctorBasicInfo = await Doctor.findById(req.user?.id).select([
    'name',
    'email',
    'gender',
    'country',
    'phone',
    'date_of_birth',
    'job',
  ]);

  if (!doctorBasicInfo) {
    throw new BadRequestError('oops, somthing went wrong');
  }

  res.json({ status: true, data: doctorBasicInfo });
};

export const update = async (data: any, req: Request, res: Response) => {
  const doctorBasicInfo = await Doctor.findById(req.user?.id);

  if (!doctorBasicInfo) {
    throw new BadRequestError('oops, somthing went wrong');
  }

  if (data.password) {
    data = {
      ...data,
      password: await Password.hash(data.password),
    };
  }

  doctorBasicInfo.set(data);

  await doctorBasicInfo.save();

  const publisher = new DoctorUpdatedPublisher(natsWrapper.client);
  await publisher.publish({
    id: doctorBasicInfo.id,
    name: doctorBasicInfo.name,
    email: doctorBasicInfo.email,
    phone: doctorBasicInfo.phone,
    image: doctorBasicInfo.image,
  });

  res.json({ status: true, msg: 'basic info updated successfully' });
};
