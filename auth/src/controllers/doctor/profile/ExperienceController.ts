import { BadRequestError } from '@hti/common';
import { Request, Response } from 'express';
import { Doctor } from '../../../models/Doctor';

export const edit = async (req: Request, res: Response) => {
  const experienceData = await Doctor.findById(req.user?.id).select([
    'experiences',
    'certificates',
    'educations',
  ]);

  res.json({
    status: true,
    data: experienceData,
  });
};

// Experience
export const experienceSave = async (
  data: any,
  req: Request,
  res: Response
) => {
  const doctor = await Doctor.findById(req.user?.id);

  if (!doctor) {
    throw new BadRequestError('oops, somthing went wrong');
  }

  doctor.experiences.push(data);
  await doctor.save();

  res.json({ staus: true, msg: 'Experience added successfully' });
};

export const experienceDelete = async (req: Request, res: Response) => {
  const doctor = await Doctor.findById(req.user?.id);

  if (!doctor) {
    throw new BadRequestError('oops, somthing went wrong');
  }

  const oldLen = doctor.experiences.length;
  doctor.experiences = doctor.experiences.filter((el) => {
    return el._id.toString() !== req.body.id;
  });

  if (doctor.experiences.length === oldLen) {
    throw new BadRequestError('There is no experience with this [ID]');
  }

  await doctor.save();

  return res.json({ staus: true, msg: 'Experience deleted successfully' });
};

// Education
export const educationSave = async (data: any, req: Request, res: Response) => {
  const doctor = await Doctor.findById(req.user?.id);

  if (!doctor) {
    throw new BadRequestError('oops, somthing went wrong');
  }

  doctor.educations.push(data);
  await doctor.save();

  res.json({ staus: true, msg: 'Education added successfully' });
};

export const educationDelete = async (req: Request, res: Response) => {
  const doctor = await Doctor.findById(req.user?.id);

  if (!doctor) {
    throw new BadRequestError('oops, somthing went wrong');
  }

  const oldLen = doctor.educations.length;
  doctor.educations = doctor.educations.filter((el) => {
    return el._id.toString() !== req.body.id;
  });

  if (doctor.educations.length === oldLen) {
    throw new BadRequestError('There is no education with this [ID]');
  }

  await doctor.save();

  return res.json({ staus: true, msg: 'Education deleted successfully' });
};

// Certificate
export const certificateSave = async (
  data: any,
  req: Request,
  res: Response
) => {
  const doctor = await Doctor.findById(req.user?.id);

  if (!doctor) {
    throw new BadRequestError('oops, somthing went wrong');
  }

  doctor.certificates.push(data);
  await doctor.save();

  res.json({ staus: true, msg: 'Certificate added successfully' });
};

export const certificateDelete = async (req: Request, res: Response) => {
  const doctor = await Doctor.findById(req.user?.id);

  if (!doctor) {
    throw new BadRequestError('oops, somthing went wrong');
  }

  const oldLen = doctor.certificates.length;
  doctor.certificates = doctor.certificates.filter((el) => {
    return el._id.toString() !== req.body.id;
  });

  if (doctor.certificates.length === oldLen) {
    throw new BadRequestError('There is no certificate with this [ID]');
  }

  await doctor.save();

  return res.json({ staus: true, msg: 'Certificate deleted successfully' });
};
