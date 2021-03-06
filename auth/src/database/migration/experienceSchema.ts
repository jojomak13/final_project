import { Schema } from 'mongoose';

export const experienceSchema = new Schema({
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
  from: {
    type: Schema.Types.Date,
    required: true,
  },
  to: {
    type: Schema.Types.Date,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
});
