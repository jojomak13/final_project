import { LocaleColumn } from '@hti/common';
import mongoose, { Schema, model } from 'mongoose';

interface SpecializationAttrs {
  name: LocaleColumn[];
}

export interface SpecializationDocument extends mongoose.Document {
  id: string;
  name: LocaleColumn[];
}

interface SpecializationModel extends mongoose.Model<SpecializationDocument> {
  build(attrs: SpecializationAttrs): SpecializationDocument;
}

const SpecializationSchema = new Schema(
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

SpecializationSchema.statics.build = (attrs: SpecializationAttrs) => {
  return new Specialization(attrs);
};

const Specialization = model<SpecializationDocument, SpecializationModel>(
  'Specialization',
  SpecializationSchema
);

export { Specialization };
