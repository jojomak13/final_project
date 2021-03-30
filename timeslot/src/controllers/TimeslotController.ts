import { BadRequestError, NotFoundError } from '@hti/common';
import { Request, Response } from 'express';
import { Timeslot } from '../models/Timeslot';
import { TimeslotService } from '../services/TimeslotService';

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

export const store = async (data: any, req: Request, res: Response) => {
  const { start_day, start_time, duration, is_bulk } = req.body;

  const timeslotService = new TimeslotService(
    start_day,
    start_time,
    duration,
    req.user!.id
  );

  console.log(await timeslotService.save());

  // single time slot condition
  // if (!is_bulk) {
  //   if (timeSlot) {
  //     throw new BadRequestError('Time slot already exist');
  //   } else {
  //     const newTimeSlot = Timeslot.build(req.body);
  //     await newTimeSlot.save();
  //     return res.status(201).json({
  //       status: true,
  //       msg: 'Time slot created successfully',
  //     });
  //   }
  // } else {
  // }
};

export const destroy = async (req: Request, res: Response) => {
  const timeSlot = await Timeslot.findById(req.params.id);

  if (!timeSlot) throw new NotFoundError();

  if (timeSlot.order_id || timeSlot.doctor_id !== req.user!.id) {
    throw new BadRequestError('Not Allowed to remove this time slot');
  }

  await timeSlot.remove();

  return res.json({
    status: true,
    msg: 'timeslot deleted success',
  });
};
