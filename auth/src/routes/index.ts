import { Router } from 'express';
import { PatientRouter } from './patient';
import { doctorRouter } from './doctor/index';
import { PublicRouter } from './public';

const router = Router();
router.use('/patient', PatientRouter);
router.use('/doctor', doctorRouter);
router.use('/public', PublicRouter);

router.get('/', async (_req, res) => {
  res.json({ name: 'Auth Service' });
});

export { router };
