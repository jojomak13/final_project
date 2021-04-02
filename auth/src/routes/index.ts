import { Router } from 'express';
import { PatientRouter } from './patient';
import { doctorRouter } from './doctor/index';

const router = Router();
router.use('/patient', PatientRouter);
router.use('/doctor', doctorRouter);

router.get('/', async (_req, res) => {
  res.json({ name: 'Auth Service' });
});

export { router };
