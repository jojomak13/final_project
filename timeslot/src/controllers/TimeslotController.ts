import { BadRequestError, NotFoundError } from '@hti/common';
import { Request, Response } from 'express';
import { Doctor } from '../models/Doctor';
import { Timeslot } from '../models/Timeslot';
import { TimeslotService } from '../services/TimeslotService';

export const show = async (req: Request, res: Response) => {
  const doctorId: any = req.query.doctorId;

  if (!doctorId) {
    throw new NotFoundError();
  }

  const timeslots = await Timeslot.find({ doctor: doctorId });

  res.json({
    status: true,
    data: timeslots,
  });
};

export const store = async (req: Request, res: Response) => {
  const { start_day, start_time, duration, end_day, is_bulk } = req.body;

  const doctor = await Doctor.findById(req.user!.id);

  if (!doctor) {
    throw new Error(`doctor [${req.user?.id}] not found in timeslot service`);
  }

  const timeslotService = new TimeslotService(
    start_day,
    start_time,
    duration,
    doctor
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
  const timeslot = await Timeslot.findById(req.params.id);

  if (!timeslot) throw new NotFoundError();

  if (timeslot.is_booked || timeslot.doctor.toString() !== req.user!.id) {
    throw new BadRequestError('Not Allowed to remove this time slot');
  }

  if (timeslot.created_at.getTime() !== timeslot.updated_at.getTime())
    await timeslot.delete();
  else await timeslot.remove();

  return res.json({
    status: true,
    msg: 'time slot deleted success',
  });
};
