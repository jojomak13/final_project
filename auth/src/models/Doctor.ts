import { AuthTypes, LocaleColumn, Prefix, SessionFees } from '@hti/common';
import mongoose, { Schema } from 'mongoose';
import { certificateSchema } from '../database/migration/certificateSchema';
import { educationSchema } from '../database/migration/educationSchema';
import { experienceSchema } from '../database/migration/experienceSchema';
import { Auth, loginPayload } from '../helpers/Auth';
import { Password } from '../helpers/password';
import { CountryDocument } from './Country';
import { Gender } from './enums/gender';
import { JobDocument } from './Job';
import { LanguageDocument } from './Language';
import { SpecializationDocument } from './Specialization';

interface DoctorAttrs {
  name: LocaleColumn[];
  title: LocaleColumn[];
  email: string;
  phone: string;
  gender: Gender;
  date_of_birth: Date;
  password: string;
  image?: string;
  country: CountryDocument;
  approved: boolean;
  prefix: Prefix;
  biography: LocaleColumn[];
  job: JobDocument;
  fees: SessionFees;
  languages: Array<LanguageDocument>;
  specializations: Array<SpecializationDocument>;
  main_focus: Array<SpecializationDocument>;
  experiences: Array<any>;
  certificates: Array<any>;
  educations: Array<any>;
}

interface DoctorDocument extends mongoose.Document {
  id: string;
  name: LocaleColumn[];
  title: LocaleColumn[];
  email: string;
  phone: string;
  gender: Gender;
  date_of_birth: Date;
  password: string;
  image?: string;
  country: CountryDocument;
  approved: boolean;
  prefix: Prefix;
  biography: LocaleColumn[];
  job: JobDocument;
  fees: SessionFees;
  new_fees?: SessionFees;
  fees_updated_at: Date;
  languages: Array<LanguageDocument>;
  specializations: Array<SpecializationDocument>;
  main_focus: Array<SpecializationDocument>;
  experiences: Array<any>;
  certificates: Array<any>;
  educations: Array<any>;
  login(guard?: AuthTypes): loginPayload;
}

interface DoctorModel extends mongoose.Model<DoctorDocument> {
  build(atters: DoctorAttrs): DoctorDocument;
}

const DoctorSchema = new mongoose.Schema(
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
      enum: Gender,
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
      ref: 'Country',
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      enum: Prefix,
    },
    biography: {
      type: [
        {
          lang: String,
          value: String,
        },
      ],
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    },
    fees: {
      type: [],
    },
    new_fees: {
      type: [],
    },
    fees_updated_at: {
      type: Schema.Types.Date,
      default: new Date(1970).toISOString(),
      required: true,
    },
    languages: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Language',
        },
      ],
    },
    specializations: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Specialization',
        },
      ],
    },
    main_focus: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Specialization',
        },
      ],
    },
    experiences: {
      type: [experienceSchema],
    },
    certificates: {
      type: [certificateSchema],
    },
    educations: {
      type: [educationSchema],
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

DoctorSchema.set('versionKey', 'version');

DoctorSchema.statics.build = (atters: DoctorAttrs) => {
  return new Doctor(atters);
};

DoctorSchema.methods.login = function (guard: AuthTypes) {
  return Auth.login(this, guard || AuthTypes.DOCTOR);
};

DoctorSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.hash(this.get('password'));
    this.set('password', hashedPassword);
  }

  done(null);
});

const Doctor = mongoose.model<DoctorDocument, DoctorModel>(
  'Doctor',
  DoctorSchema
);

export { Doctor };
