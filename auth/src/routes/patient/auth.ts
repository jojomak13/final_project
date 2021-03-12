import { patient, RequestValidationError } from '@hti/common';
import { Router, Request, Response } from 'express';
import * as AuthController from '../../controllers/patient/AuthController';
import { LoginRequest } from '../../requests/patient/LoginRequest';
import { SignupRequest } from '../../requests/patient/SignupRequest';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const data = await SignupRequest.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  }).catch((err) => {
    throw new RequestValidationError(err);
  });

  await AuthController.signup(data, req, res);
});

router.post('/login', async (req: Request, res: Response) => {
  LoginRequest.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  }).catch((err) => {
    throw new RequestValidationError(err);
  });

  await AuthController.login(req, res);
});

router.get('/me', patient, AuthController.me);

export { router as AuthRouter };
