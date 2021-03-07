import mongoose, { Schema, model } from 'mongoose';
import { CountryDocument } from './Country';
import { Gender } from './enums/gender';

interface Patientatters {
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  date_of_birth: Date;
  password: string;
  image?: string;
  country: CountryDocument;
}

interface PatientDocument extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  date_of_birth: Date;
  password: string;
  image?: string;
  country: CountryDocument;
}

interface PatientModel extends mongoose.Model<PatientDocument> {
  build(atters: Patientatters): PatientDocument;
}

const PatientSchema = new Schema(
  {
    name: {
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
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: true,
    },
    date_of_birth: {
      type: Schema.Types.Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    country: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Country',
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

PatientSchema.statics.build = (atters: Patientatters) => {
  return new Patient(atters);
};

const Patient = model<PatientDocument, PatientModel>('Patient', PatientSchema);

export { Patient };
