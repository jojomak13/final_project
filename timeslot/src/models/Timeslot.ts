import mongoose, { Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { Doctor, DoctorDocument } from './Doctor';
import { Duration } from './enums/DurationEnum';

interface TimeslotAttrs {
  duration: Duration;
  start_time: Date;
  end_time: Date;
  doctor: DoctorDocument;
}

export interface TimeslotDocument extends mongoose.Document {
  id: string;
  duration: Duration;
  start_time: Date;
  end_time: Date;
  doctor: DoctorDocument;
  is_booked: boolean;
  created_at: Date;
  updated_at: Date;
}

interface TimeslotModel extends mongoose.Model<TimeslotDocument> {
  build(atters: TimeslotAttrs): TimeslotDocument;
}

const TimeslotSchema = new Schema(
  {
    duration: {
      type: String,
      enum: Object.values(Duration),
      required: true,
    },
    start_time: {
      type: Schema.Types.Date,
      required: true,
    },
    end_time: {
      type: Schema.Types.Date,
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: Doctor,
      required: true,
    },
    is_booked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

TimeslotSchema.plugin(mongooseDelete, {
  deleted_at: true,
  overrideMethods: true,
});

TimeslotSchema.set('versionKey', 'version');

TimeslotSchema.statics.build = (atters: TimeslotAttrs) => {
  return new Timeslot(atters);
};

const Timeslot = mongoose.model<TimeslotDocument, TimeslotModel>(
  'Timeslot',
  TimeslotSchema
);

export { Timeslot };
