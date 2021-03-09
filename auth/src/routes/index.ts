import { Router } from 'express';
import { env } from '../helpers/config';

const router = Router();

router.get('/', async (_req, res) => {
  res.json({ name: 'Auth Service', port: env('PORT', 8080) });
});

export { router };
