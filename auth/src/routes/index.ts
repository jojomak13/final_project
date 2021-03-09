import { Router } from 'express';
import { env } from '../helpers/config';
import { doctorRouter } from './doctor/index'

const router = Router();

router.get('/', async (_req, res) => {
  res.json({ name: 'Auth Service', port: env('PORT', 8080) });
});

router.use(doctorRouter);

export { router };
