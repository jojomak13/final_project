import { Router } from 'express';
import * as BasicInfoController from '../../controllers/doctor/profile/BasicInfoController';
import * as AboutmeController from '../../controllers/doctor/profile/AboutmeController';
import * as ExperienceController from '../../controllers/doctor/profile/ExperienceController';
const router = Router();

// Basic Info
router.get('/info', BasicInfoController.edit);
router.patch('/info', BasicInfoController.update);

// About Me
router.get('/about', AboutmeController.edit);
router.patch('/about', AboutmeController.update);

//  Experience
router.get('/experience', ExperienceController.edit);
router.patch('/experience', ExperienceController.update);

export { router as ProfileRouter };
