import { RequestValidationError } from '@hti/common';
import { Router, Request, Response } from 'express';
import { SignupRequest } from '../../requests/doctor/signupRequest';
import * as AuthController from '../../controllers/doctor/AuthController'

const router = Router();

router.get('/me', (req, res) => {
  res.send('current doctor sent');
});

router.post('/logout', (req, res) => {
  res.send('loged out');
});

router.post('/login', (req, res) => {
  res.send('doctor login');
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

export { router as authRouter };
