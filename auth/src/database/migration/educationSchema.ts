import { Schema } from 'mongoose';

export const educationSchema = new Schema(
  {
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
