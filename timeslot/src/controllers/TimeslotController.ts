import { BadRequestError, NotFoundError, RequestValidationError } from '@hti/common';
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

export const store = async (req: Request, res: Response) => {
  /**
   * [Types of timeslots]
   * {single} timeslot
   * {group} timeslot
   */
  // TODO:: check if no overlap
  const {start_day, is_bulk} = req.body;
  const timeSlot = await Timeslot.findOne({ start_day: start_day });

  // single time slot condition
  if (!is_bulk) {
    if (timeSlot) {
      throw new BadRequestError('Time slot already exist');
    }else{
      const newTimeSlot =  Timeslot.build(req.body);
      await newTimeSlot.save();
      return res.status(201).json({
        status: true,
        msg: 'Time slot created successfully',
      });
    }
  }else{

  }
};

export const destroy = async (req: Request, res: Response) => {
  // check if orderId is null
  const timeSlot = await Timeslot.findById(req.params.id);
  if(!timeSlot || timeSlot.order_id){
    throw new BadRequestError('Not Allowed to remove this time slot');
  }else {
    await timeSlot.remove();
  }
};
