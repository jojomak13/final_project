import mongoose, { Schema, model } from 'mongoose';

interface SpecializationAttrs {
  name_en: string;
  name_ar: string;
}

export interface SpecializationDocument extends mongoose.Document {
  id: string;
  name_en: string;
  name_ar: string;
}

interface SpecializationModel extends mongoose.Model<SpecializationDocument> {
  build(attrs: SpecializationAttrs): SpecializationDocument;
}

const SpecializationSchema = new Schema(
  {
    name_en: {
      type: String,
      required: true,
    },
    name_ar: {
      type: String,
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
