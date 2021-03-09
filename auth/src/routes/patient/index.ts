import { Router } from 'express';
import { AuthRouter } from './auth';

const router = Router();

// Auth Routes
router.use('/auth', AuthRouter);

router.post('/', async (req, res) => {
  res.json('welcome client');
});

export { router as PatientRouter };
