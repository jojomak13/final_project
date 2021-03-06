import { Schema } from 'mongoose';

export const certificateSchema = new Schema({
  organization_en: {
    type: String,
    required: true,
  },
  organization_ar: {
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
  from: {
    type: Schema.Types.Date,
    required: true,
  },
  to: {
    type: Schema.Types.Date,
  },
  licensing_organization: {
    type: String,
  },
  licensing_number: {
    type: String,
  },
  doctor: {
    type: String,
    required: true,
  },
});
