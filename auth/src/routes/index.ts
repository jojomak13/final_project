import { Router } from 'express';
import { PatientRouter } from './patient';

const router = Router();
router.use('/client', PatientRouter);

router.get('/', async (_req, res) => {
  res.json({ name: 'Auth Service' });
});

export { router };
