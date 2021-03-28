import mongoose, { Types } from 'mongoose';
import { Duration } from './enums/DurationEnum';

interface TimeslotAttrs {
  duration: Duration;
  start_time: Date;
  end_time: Date;
  order_id: string;
  doctor_id: string;
}

export interface TimeslotDocument extends mongoose.Document {
  id: string;
  duration: Duration;
  start_time: Date;
  end_time: Date;
  order_id: string;
  doctor_id: string;
}

interface TimeslotModel extends mongoose.Model<TimeslotDocument> {
  build(atters: TimeslotAttrs): TimeslotDocument;
}

const TimeslotSchema = new mongoose.Schema({
  duration: {
    type: String,
    enum: Object.values(Duration),
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  doctor_id: {
    type: Types.ObjectId,
    required: true,
  },
  order_id: {
    type: Types.ObjectId,
  },
});

TimeslotSchema.statics.build = (atters: TimeslotAttrs) => {
  return new Timeslot(atters);
};

const Timeslot = mongoose.model<TimeslotDocument, TimeslotModel>(
  'Timslot',
  TimeslotSchema
);

export { Timeslot };
