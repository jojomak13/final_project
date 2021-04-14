import { Router } from 'express';
import * as ChargeController from '../controllers/ChargeController';

const router = Router();

router.post('/checkout/:id', ChargeController.checkout);

export { router as ChargeRouter };
