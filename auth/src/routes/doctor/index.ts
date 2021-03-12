import { doctor } from '@hti/common';
import { Router } from 'express';
import { authRouter } from './auth';
import { ProfileRouter } from './profile';

const router = Router();

router.use('/auth', authRouter);
router.use('/profile', doctor, ProfileRouter);

export { router as doctorRouter };
