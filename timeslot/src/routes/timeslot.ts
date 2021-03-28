import { Router } from 'express';
import * as TimeslotController from '../controllers/TimeslotController';

const router = Router();

router.get('/', TimeslotController.show);

export { router as timeslotRouter };
