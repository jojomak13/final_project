import { auth, patient } from '@hti/common';
import { Router } from 'express';
import { AuthRouter } from './auth';
import { ProfileRouter } from './profile';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/profile', patient, ProfileRouter);

export { router as PatientRouter };
