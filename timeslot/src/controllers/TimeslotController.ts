import { BadRequestError, NotFoundError } from '@hti/common';
import { Request, Response } from 'express';
import { Timeslot } from '../models/Timeslot';

export const show = async (req: Request, res: Response) => {
  const doctorId: any = req.query.doctorId;

  if (!doctorId) {
    throw new NotFoundError();
  }

  const timeslots = await Timeslot.find({ doctor_id: doctorId });

  res.json({
    status: true,
    data: timeslots,
  });
};

export const store = (req: Request, res: Response) => {
  // ** form validation **
  // date
  // start time
  // duration
  // isBulk [true, false]
  // end date
  /**
   * [Types of timeslots]
   * {single} timrslot
   * {group} timeslot
   */
  // TODO:: check if no overlap
};

export const destroy = (req: Request, res: Response) => {
  // check if orderId is null
};
