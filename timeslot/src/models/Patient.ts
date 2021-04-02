import mongoose, { Schema, model } from 'mongoose';

interface Patientattrs {
  id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
}

export interface PatientDocument extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
}

interface PatientModel extends mongoose.Model<PatientDocument> {
  build(atters: Patientattrs): PatientDocument;
}

const PatientSchema = new Schema(
  {
    name: {
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
    image: {
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

PatientSchema.set('versionKey', 'version');

PatientSchema.statics.build = (attrs: Patientattrs) => {
  return new Patient({
    _id: attrs.id,
    ...attrs,
  });
};

const Patient = model<PatientDocument, PatientModel>('Patient', PatientSchema);

export { Patient };
