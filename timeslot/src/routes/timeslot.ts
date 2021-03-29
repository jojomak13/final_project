import { RequestValidationError } from '@hti/common';
import { Router, Request, Response } from 'express';
import * as TimeslotController from '../controllers/TimeslotController';
import { Timeslot } from '../models/Timeslot';
import { PostTimeSlotRequest } from '../requsts/doctor/PostTimeSlotRequest';

const router = Router();

router.get('/', TimeslotController.show);

router.post('/', async(req: Request, res: Response) => {
// ** form validation **
  // date
  // start time
  // duration
  // isBulk [true, false]
  // end date
  const data = await PostTimeSlotRequest.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  }).catch((err) => {
    throw new RequestValidationError(err);
  });

  await TimeslotController.store(req, res);
});

export { router as timeslotRouter };
