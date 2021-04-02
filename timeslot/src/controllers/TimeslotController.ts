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

export const store = async (req: Request, res: Response) => {
  const { start_day, start_time, duration, end_day, is_bulk } = req.body;

  const timeslotService = new TimeslotService(
    start_day,
    start_time,
    duration,
    req.user!.id
  );

  if (is_bulk) {
    await timeslotService.createBulk(end_day);
  } else {
    await timeslotService.save();
  }

  return res.status(201).json({
    status: !timeslotService.fails(),
    msg: timeslotService.fails()
      ? `${timeslotService.failedSolts().length} Timeslot[s] is already exsist!`
      : 'Time slot created successfully',
    body: timeslotService.failedSolts(),
  });
};

export const destroy = async (req: Request, res: Response) => {
  const timeSlot = await Timeslot.findById(req.params.id);

  if (!timeSlot) throw new NotFoundError();

  if (timeSlot.is_booked || timeSlot.doctor.id.toString() !== req.user!.id) {
    throw new BadRequestError('Not Allowed to remove this time slot');
  }

  await timeSlot.remove();

  return res.json({
    status: true,
    msg: 'timeslot deleted success',
  });
};
