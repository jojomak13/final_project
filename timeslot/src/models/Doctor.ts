import mongoose, { Schema } from 'mongoose';
import { LocaleColumn, Prefix, SessionFees } from '@hti/common';

export interface DoctorAttrs {
  id: string;
  name: LocaleColumn[];
  title: LocaleColumn[];
  email: string;
  phone: string;
  image?: string;
  prefix: Prefix;
  fees: SessionFees;
}

export interface DoctorDocument extends mongoose.Document {
  id: string;
  name: LocaleColumn[];
  title: LocaleColumn[];
  email: string;
  phone: string;
  image?: string;
  prefix: Prefix;
  fees: SessionFees;
}

interface DoctorModel extends mongoose.Model<DoctorDocument> {
  build(attrs: DoctorAttrs): DoctorDocument;
}

const DoctorSchema = new Schema(
  {
    name: {
      type: [
        {
          lang: String,
          value: String,
        },
      ],
      required: true,
    },
    title: {
      type: [
        {
          lang: String,
          value: String,
        },
      ],
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
      // TODO:: remove comment after creating admin
      // required: true,
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

DoctorSchema.statics.build = (attrs: DoctorAttrs) => {
  return new Doctor({
    _id: attrs.id,
    ...attrs,
  });
};

const Doctor = mongoose.model<DoctorDocument, DoctorModel>(
  'Doctor',
  DoctorSchema
);

export { Doctor };
