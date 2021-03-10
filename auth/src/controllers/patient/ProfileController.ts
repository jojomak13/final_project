import { Request, Response } from 'express';
import { Patient } from "../../models/Patient"


export const update = async (data: any, req: Request, res: Response) => {
    const patient = await Patient.findByIdAndUpdate(req.user?.id, data);

    await patient!.save();

    res.json({ status: true, msg: 'profile updated successfully' });
}