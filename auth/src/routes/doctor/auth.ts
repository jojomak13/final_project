import { doctor, RequestValidationError } from '@hti/common';
import { Router, Request, Response } from 'express';
import { SignupRequest } from '../../requests/doctor/SignupRequest';
import * as AuthController from '../../controllers/doctor/AuthController';
import { LoginRequest } from '../../requests/doctor/LoginRequest';

const router = Router();

router.post('/login', async (req, res) => {
  LoginRequest.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  }).catch((err) => {
    throw new RequestValidationError(err);
  });

  await AuthController.login(req, res);
});

router.post('/register', async (req: Request, res: Response) => {
  const data = await SignupRequest.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  }).catch((err) => {
    throw new RequestValidationError(err);
  });

  await AuthController.signup(data, req, res);
});

router.get('/me', doctor, AuthController.me);

export { router as authRouter };
