import { Router, Response, Request } from "express";
import { Doctor } from "../../models/Doctor";

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    const therapistList = await Doctor.find();
    res.status(200).json({
        status: true,
        data: therapistList,
    });
});

export {router as TherapistListRouter};