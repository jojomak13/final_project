import { BadRequestError } from '@hti/common';
import { Request, Response } from 'express';
import { Password } from '../../helpers/password';
import { Doctor } from '../../models/Doctor';

export const edit = async (req: Request, res: Response) => {
    const doctor = await Doctor.findById(req.user?.id).populate('country');

    if (!doctor) {
        throw new BadRequestError('oops, somthing went wrong');
    }

    res.json({ status: true, data: doctor });
};

export const update = async (data: any, req: Request, res: Response) => {
    const doctor = await Doctor.findById(req.user?.id);

    if (!doctor) {
        throw new BadRequestError('oops, somthing went wrong');
    }

    if (data.password) {
        data = {
            ...data,
            password: await Password.hash(data.password),
        };
    }

    await doctor.updateOne(data);

    res.json({ status: true, msg: 'profile updated successfully' });
};
