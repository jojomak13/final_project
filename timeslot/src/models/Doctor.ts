import mongoose, { Schema } from 'mongoose';
import { Prefix } from './enums/prefix';

interface IFees {
  usd: {
    half: number;
    full: number;
  };
  pound: {
    half: number;
    full: number;
  };
}

interface SessionFees {
  video: IFees;
}

export interface DoctorAttrs {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  image?: string;
  prefix: Prefix;
  fees: SessionFees;
}

export interface DoctorDocument extends mongoose.Document {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  image?: string;
  prefix: Prefix;
  fees: SessionFees;
}

interface DoctorModel extends mongoose.Model<DoctorDocument> {
  build(atters: DoctorAttrs): DoctorDocument;
}

const DoctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    prefix: {
      type: String,
      enum: Object.values(Prefix),
      required: true,
    },
    fees: {
      type: [],
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

DoctorSchema.set('versionKey', 'version');

DoctorSchema.statics.build = (atters: DoctorAttrs) => {
  return new Doctor(atters);
};

const Doctor = mongoose.model<DoctorDocument, DoctorModel>(
  'Doctor',
  DoctorSchema
);

export { Doctor };
