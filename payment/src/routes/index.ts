import { Router } from 'express';
import { ChargeRouter } from './charge';

const router = Router();

router.use('/payment', ChargeRouter);

export { router };
