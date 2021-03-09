import { RequestValidationError } from '@hti/common';
import { Router, Request, Response } from 'express';
import * as AuthController from '../../controllers/patient/AuthController';
import { SignupRequest } from '../../requests/patient/SignupRequest';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const data = await SignupRequest.validateAsync(req.body);
    AuthController.signup(data, req, res);
  } catch (err) {
    throw new RequestValidationError(err);
  }
});

router.post('/login', async (req, res) => {
  res.json(req.body);
});

router.get('/me', async (req, res) => {
  res.json('me');
});

export { router as AuthRouter };
