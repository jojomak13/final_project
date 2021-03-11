import { auth } from '@hti/common';
import { Router } from 'express';
import { authRouter } from './auth';
import { ProfileRouter } from './profile';

const router = Router();

router.use('/auth', authRouter);
router.use('/profile', auth, ProfileRouter);

export { router as doctorRouter };
