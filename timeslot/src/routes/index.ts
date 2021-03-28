import { Router } from 'express';
import { timeslotRouter } from './timeslot';

const router = Router();
router.use('/timeslot', timeslotRouter);

export { router };
