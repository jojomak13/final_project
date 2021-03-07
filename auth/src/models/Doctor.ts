import mongoose, { Schema } from 'mongoose';
import { certificateSchema } from '../database/migration/certificateSchema';
import { educationSchema } from '../database/migration/educationSchema';
import { experienceSchema } from '../database/migration/experienceSchema';
import { CountryDocument } from './Country';
import { Gender } from './enums/gender';
import { Prefix } from './enums/prefix';
import { JobDocument } from './Job';
import { LanguageDocument } from './Language';
import { SpecializationDocument } from './Specialization';

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

interface DoctorAttrs {
  name_en: string;
  name_ar: string;
  title_en: string;
  title_ar: string;
  email: string;
  phone: string;
  gender: Gender;
  date_of_birth: Date;
  password: string;
  image?: String;
  country: CountryDocument;
  approved: boolean;
  prefix: Prefix;
  biography_en: string;
  biography_ar: string;
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
  name_en: string;
  name_ar: string;
  title_en: string;
  title_ar: string;
  email: string;
  phone: string;
  gender: Gender;
  date_of_birth: Date;
  password: string;
  image?: String;
  country: CountryDocument;
  approved: boolean;
  prefix: Prefix;
  biography_en: string;
  biography_ar: string;
  job: JobDocument;
  fees: SessionFees;
  new_fees?: SessionFees;
  fees_updated_at?: Date;
  languages: Array<LanguageDocument>;
  specializations: Array<SpecializationDocument>;
  main_focus: Array<SpecializationDocument>;
  experiences: Array<any>;
  certificates: Array<any>;
  educations: Array<any>;
}

interface DoctorModel extends mongoose.Model<DoctorDocument> {
  build(atters: DoctorAttrs): DoctorDocument;
}

const DoctorSchema = new mongoose.Schema({
  name_en: {
    type: String,
    required: true,
  },
  name_ar: {
    type: String,
    required: true,
  },
  title_en: {
    type: String,
    required: true,
  },
  title_ar: {
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
  countrey: {
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
    required: true,
  },
  biography_en: {
    type: String,
    required: true,
  },
  biography_ar: {
    type: String,
    required: true,
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  fees: {
    type: Object,
    required: true,
  },
  new_fees: {
    type: Object,
  },
  fees_updated_at: {
    type: Schema.Types.Date,
  },
  languages: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Language',
      },
    ],
    required: true,
  },
  specializations: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Specialization',
      },
    ],
    required: true,
  },
  main_focus: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Specialization',
      },
    ],
    required: true,
  },
  experiences: {
    type: [experienceSchema],
    required: true,
  },
  certificates: {
    type: [certificateSchema],
    required: true,
  },
  educations: {
    type: [educationSchema],
    required: true,
  },
});

DoctorSchema.statics.build = (atters: DoctorAttrs) => {
  return new Doctor(atters);
};

const Doctor = mongoose.model<DoctorDocument, DoctorModel>(
  'Doctor',
  DoctorSchema
);

export { Doctor };
