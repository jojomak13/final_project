import { BadRequestError, DBValidationError } from '@hti/common';
import { Request, Response } from 'express';
import { Auth } from '../../helpers/Auth';
import { Password } from '../../helpers/password';
import { Doctor } from '../../models/Doctor';

export const signup = async (data: any, req: Request, res: Response) => {
    const doctor = await Doctor.findOne().or([
        { email: data.email },
        { phone: data.phone },
    ]);

    if (doctor) {
        const errors = [];

        if (data.email === doctor.email)
            errors.push({ message: 'email already exist', field: 'email' });
        if (data.phone === doctor.phone)
            errors.push({ message: 'phone already exist', field: 'phone' });

        throw new DBValidationError(errors);
    }

    const newDoctor = Doctor.build(data);
    await newDoctor.save();

    return res.status(201).json({
        status: true,
        msg: 'acount created successfully',
    });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email }).populate('country');

    if (!doctor || !(await Password.compare(password, doctor.password))) {
        throw new BadRequestError('Invalid Credentials');
    }

    const token = await Auth.login(Doctor);

    res.json({ status: true, data: { token } });
};

export const me = async (req: Request, res: Response) => {
    return res.json({
        status: true,
        data: req.user,
    });
};
