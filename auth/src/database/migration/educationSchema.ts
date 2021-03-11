import { Schema } from 'mongoose';

export const educationSchema = new Schema({
  school: {
    type: [
      {
        lang: String,
        value: String,
      },
    ],
    required: true,
  },
  degree: {
    type: [
      {
        lang: String,
        value: String,
      },
    ],
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
  },
});
