import { RequestValidationError } from '@hti/common';
import { Router, Request, Response } from 'express';
import * as profileController from '../../controllers/patient/ProfileController';
import { UpdateProfileRequest } from '../../requests/patient/UpdateProfileRequest';

const router = Router();

router.get('/', profileController.edit);

router.patch('/', async (req: Request, res: Response) => {
  const data = await UpdateProfileRequest.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  }).catch((err) => {
    throw new RequestValidationError(err);
  });
  await profileController.update(data, req, res);
});

export { router as ProfileRouter };
