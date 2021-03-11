import { Schema } from 'mongoose';

export const experienceSchema = new Schema(
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
