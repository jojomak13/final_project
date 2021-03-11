import { Schema } from 'mongoose';

export const certificateSchema = new Schema({
  organization: {
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
  licensing_organization: {
    type: String,
  },
  licensing_number: {
    type: String,
  },
});
