import { Router } from 'express';
import { PatientRouter } from './patient';
import { doctorRouter } from './doctor/index';

const router = Router();
router.use('/client', PatientRouter);

router.get('/', async (_req, res) => {
  res.json({ name: 'Auth Service' });
});

router.use(doctorRouter);

export { router };
