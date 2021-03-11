import { Router, Request, Response } from 'express';
import * as BasicInfoController from '../../controllers/doctor/profile/BasicInfoController';
import * as AboutmeController from '../../controllers/doctor/profile/AboutmeController';
import * as ExperienceController from '../../controllers/doctor/profile/ExperienceController';
import ExperienceRequest from '../../requests/doctor/profile/ExperienceRequest';
import { RequestValidationError } from '@hti/common';
import CertificateRequest from '../../requests/doctor/profile/CertificateRequest';
import EducationRequest from '../../requests/doctor/profile/EducationRequest';
import { BasicInfoRequest } from '../../requests/doctor/profile/BasicInfoRequest';
import { AboutmeRequest } from '../../requests/doctor/profile/AboutmeRequest';

const router = Router();

// Basic Info
router.get('/info', BasicInfoController.edit);
router.patch('/info', async (req: Request, res: Response) => {
  const data = await BasicInfoRequest.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  }).catch((err) => {
    throw new RequestValidationError(err);
  });
  await BasicInfoController.update(data, req, res);
});

// About Me
router.get('/about', AboutmeController.edit);
router.patch('/about', async (req: Request, res: Response) => {
  const data = await AboutmeRequest.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  }).catch((err) => {
    throw new RequestValidationError(err);
  });
  await AboutmeController.update(data, req, res);
});

router.get('/experience', ExperienceController.edit);

//  Experience
router.post('/experience', async (req: Request, res: Response) => {
  const data = await ExperienceRequest.create
    .validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })
    .catch((err) => {
      throw new RequestValidationError(err);
    });

  await ExperienceController.experienceSave(data, req, res);
});

router.delete('/experience', async (req: Request, res: Response) => {
  await ExperienceRequest.destroy
    .validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })
    .catch((err) => {
      throw new RequestValidationError(err);
    });

  await ExperienceController.experienceDelete(req, res);
});

// Certificate
router.post('/certificate', async (req: Request, res: Response) => {
  const data = await CertificateRequest.create
    .validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })
    .catch((err) => {
      throw new RequestValidationError(err);
    });

  await ExperienceController.certificateSave(data, req, res);
});

router.delete('/certificate', async (req: Request, res: Response) => {
  await CertificateRequest.destroy
    .validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })
    .catch((err) => {
      throw new RequestValidationError(err);
    });

  await ExperienceController.certificateDelete(req, res);
});

// Education
router.post('/education', async (req: Request, res: Response) => {
  const data = await EducationRequest.create
    .validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })
    .catch((err) => {
      throw new RequestValidationError(err);
    });

  await ExperienceController.educationSave(data, req, res);
});

router.delete('/education', async (req: Request, res: Response) => {
  await EducationRequest.destroy
    .validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })
    .catch((err) => {
      throw new RequestValidationError(err);
    });

  await ExperienceController.educationDelete(req, res);
});

export { router as ProfileRouter };
