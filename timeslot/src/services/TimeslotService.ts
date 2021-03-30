import { Timeslot } from '../models/Timeslot';
import moment from 'moment';

class TimeslotService {
  private timeSlot: any;
  private startTime: any;

  /**
   * TimeslotService constructor.
   * @param startDay
   * @param startTime
   * @param duration
   * @param userId
   */
  public constructor(
    private startDay: any,
    startTime: any,
    private duration: any,
    private userId: string
  ) {
    this.startTime = moment.unix(startTime).utc().format('HH:mm:ss');
  }

  private handleTimeSlot() {
    const sessionStartTime = `${this.startDay} ${this.startTime}`;

    // Configure New Time Slot Data
    const timeSlot = {
      start_time: moment(sessionStartTime).toISOString(),
      end_time: moment
        .utc(sessionStartTime)
        .add(this.duration, 'minutes')
        .toISOString(),
      duration: this.duration,
      doctor_id: this.userId,
    };

    this.timeSlot = timeSlot;
  }

  private async currentDay() {
    const timeslots = await Timeslot.find({
      start_time: {
        $gte: moment.utc(this.startDay).toDate(),
        $lte: moment.utc(this.startDay).endOf('day').toDate(),
      },
      doctor_id: this.userId,
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

    items.forEach((item: any) => {
      console.log(item);
      const startTime = moment.utc(item.start_time);
      const endTime = moment.utc(item.end_time);

      if (
        startTime.isAfter(newItem.start_time) &&
        startTime.isBefore(newItem.end_time)
      ) {
        return true;
      }

      if (
        endTime.isAfter(newItem.start_time) &&
        endTime.isBefore(newItem.end_time)
      ) {
        return true;
      }

      if (
        startTime.isSameOrBefore(newItem.start_time) &&
        endTime.isSameOrAfter(newItem.end_time)
      ) {
        return true;
      }

      if (
        startTime.isSameOrAfter(newItem.start_time) &&
        endTime.isSameOrBefore(newItem.end_time)
      ) {
        return true;
      }
    });

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

    if (this.isOverLapped(day)) return false;

    await this.store();

    return true;
  }

  // public function createBulk(endDay)
  // {
  //     startDay = Carbon::parse(this->startDay);
  //     endDay = Carbon::parse(endDay);

  //     startDay->diffInDaysFiltered(function(Carbon date) {
  //         this->startDay = date->toDateString();
  //         this->save();
  //     }, endDay->addDay());
  // }
}

export { TimeslotService };
