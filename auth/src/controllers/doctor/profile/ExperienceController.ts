import { Request, Response } from 'express';
import { Doctor } from '../../../models/Doctor';

export const edit = async (req: Request, res: Response) => {
  const experienceData = await Doctor.findById(req.user?.id).select([
    'specializations',
    'main_focus',
    'experiences',
    'certificates',
    'educations',
  ]);

  console.log(experienceData);
  res.json({
    status: true,
    data: experienceData,
  });
};

export const update = async () => {};
