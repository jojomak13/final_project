import { doctor, RequestValidationError } from '@hti/common';
import { Router, Request, Response } from 'express';
import * as TimeslotController from '../controllers/TimeslotController';
import { CreateTimeslotRequest } from '../requests/doctor/CreateTimeslotRequest';

const router = Router();

router.get('/', TimeslotController.show);

router.post('/', doctor, async (req: Request, res: Response) => {
  await CreateTimeslotRequest.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  }).catch((err) => {
    throw new RequestValidationError(err);
  });

  await TimeslotController.store(req, res);
});

router.delete('/:id', doctor, TimeslotController.destroy);

export { router as timeslotRouter };
