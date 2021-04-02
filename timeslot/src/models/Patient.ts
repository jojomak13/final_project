import mongoose, { Schema, model } from 'mongoose';

interface Patientatters {
  name: string;
  email: string;
  phone: string;
  image?: string;
}

interface PatientDocument extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
}

interface PatientModel extends mongoose.Model<PatientDocument> {
  build(atters: Patientatters): PatientDocument;
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
    }

  },
  {
    versionKey: false,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

PatientSchema.set('versionKey', 'version');

PatientSchema.statics.build = (atters: Patientatters) => {
  return new Patient(atters);
};

const Patient = model<PatientDocument, PatientModel>('Patient', PatientSchema);

export { Patient };
