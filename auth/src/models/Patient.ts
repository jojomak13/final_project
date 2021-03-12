import { AuthTypes } from '@hti/common';
import mongoose, { Schema, model } from 'mongoose';
import { Auth } from '../helpers/Auth';
import { Password } from '../helpers/password';
import { Country } from './Country';
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
  login(guard?: AuthTypes): string;
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
      ref: Country,
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

PatientSchema.set('versionKey', 'version');

PatientSchema.statics.build = (atters: Patientatters) => {
  return new Patient(atters);
};

PatientSchema.methods.login = async function (guard: AuthTypes) {
  return await Auth.login(this, guard || AuthTypes.PATIENT);
};

PatientSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.hash(this.get('password'));
    this.set('password', hashedPassword);
  }

  done(null);
});

const Patient = model<PatientDocument, PatientModel>('Patient', PatientSchema);

export { Patient };
