import { Timeslot, TimeslotDocument } from '../models/Timeslot';
import moment from 'moment';
import { DoctorDocument } from '../models/Doctor';

class TimeslotService {
  private timeSlot: any;
  private startTime: any;
  private faildSlots: Array<TimeslotDocument> = [];

  /**
   * TimeslotService constructor.
   * @param startDay
   * @param startTime
   * @param duration
   * @param doctor DoctorDocument
   */
  public constructor(
    private startDay: any,
    startTime: any,
    private duration: any,
    private doctor: DoctorDocument
  ) {
    this.startTime = moment(parseInt(startTime)).format('HH:mm:ss');
  }

  private handleTimeSlot() {
    const sessionStartTime = `${this.startDay} ${this.startTime}`;

    // Configure New Time Slot Data
    const timeSlot = {
      start_time: moment(sessionStartTime).toISOString(),
      end_time: moment(sessionStartTime)
        .add(this.duration, 'minutes')
        .toISOString(),
      duration: this.duration,
      doctor: this.doctor,
    };

    this.timeSlot = timeSlot;
  }

  private async currentDay() {
    const timeslots = await Timeslot.find({
      start_time: {
        $gte: moment(this.startDay).toDate(),
        $lte: moment(this.startDay).endOf('day').toDate(),
      },
      doctor: this.doctor,
    });

    return timeslots;
  }

  /**
   * @param items
   * @param newItem
   * @return bool
   */
  private isOverLapped(items: any): boolean {
    const newItem = this.timeSlot;

    for (let i = 0; i < items.length; i++) {
      const startTime = moment(items[i].start_time);
      const endTime = moment(items[i].end_time);
      let isFaild = false;

      if (
        startTime.isAfter(newItem.start_time) &&
        startTime.isBefore(newItem.end_time)
      ) {
        isFaild = true;
      }

      if (
        endTime.isAfter(newItem.start_time) &&
        endTime.isBefore(newItem.end_time)
      ) {
        isFaild = true;
      }

      if (
        startTime.isSameOrBefore(newItem.start_time) &&
        endTime.isSameOrAfter(newItem.end_time)
      ) {
        isFaild = true;
      }

      if (
        startTime.isSameOrAfter(newItem.start_time) &&
        endTime.isSameOrBefore(newItem.end_time)
      ) {
        isFaild = true;
      }

      if (isFaild) {
        this.faildSlots.push(newItem);
        return true;
      }
    }

    return false;
  }

  private async store() {
    const timeslot = Timeslot.build(this.timeSlot);

    try {
      await timeslot.save();
    } catch (_err) {
      return false;
    }

    return true;
  }

  public async save() {
    const day = await this.currentDay();

    this.handleTimeSlot();

    if (this.isOverLapped(day)) {
      return false;
    }

    await this.store();

    return true;
  }

  public async createBulk(date: any) {
    const day = moment(this.startDay);
    const endDay = moment(date);

    for (; day.diff(endDay) <= 0; day.add(1, 'day')) {
      this.startDay = day.format('YYYY-MM-DD');

      await this.save();
    }
  }

  public fails(): boolean {
    return !!this.faildSlots.length;
  }

  public failedSolts(): any {
    return this.faildSlots.map(({ start_time, end_time, duration }) => {
      return { start_time, end_time, duration };
    });
  }
}

export { TimeslotService };
