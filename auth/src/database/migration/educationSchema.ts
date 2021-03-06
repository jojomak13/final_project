import { Schema } from 'mongoose';

export const educationSchema = new Schema({
  school_en: {
    type: String,
    required: true,
  },
  school_ar: {
    type: String,
    required: true,
  },
  degree_en: {
    type: String,
    required: true,
  },
  degree_ar: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
  },
  doctor: {
    type: String,
    required: true,
  },
});
