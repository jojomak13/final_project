import { auth } from '@hti/common';
import { Router } from 'express';
import { AuthRouter } from './auth';
import { ProfileRouter } from './profile';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/profile', auth, ProfileRouter);

export { router as PatientRouter };
