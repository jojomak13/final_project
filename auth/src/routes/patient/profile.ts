import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  res.json('welcome from profile');
});

router.patch('/', async (req, res) => {
  res.json('edit profile');
});

export { router as ProfileRouter };
