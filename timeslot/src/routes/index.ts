import { patient } from '@hti/common';
import { Router } from 'express';
import { OrderRouter } from './order';
import { timeslotRouter } from './timeslot';

const router = Router();
router.use('/timeslot', timeslotRouter);
router.use('/order', patient, OrderRouter);

export { router };
