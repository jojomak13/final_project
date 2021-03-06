import mongoose, { Schema } from 'mongoose';
import { Gender } from './enums/gender';

interface Patientatters {
    name: string,
    email: string,
    phone: string,
    gender: Gender,
    date_of_birth: string,
    password: string,
    image?: string,
    country: string
}

interface PatientDocument extends mongoose.Document {
    id: string,
    name: string,
    email: string,
    phone: string,
    gender: Gender,
    date_of_birth: string,
    password: string,
    image?: string,
    country: string
}

interface PatientModel extends mongoose.Model<PatientDocument> {
    build(atters: Patientatters): PatientDocument;
}

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: Gender,
        required: true
    },
    date_of_birth: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    country: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Country'
    }
});

PatientSchema.statics.build = (atters: Patientatters) => {
    return new Patient(atters);
}

const Patient = mongoose.model<PatientDocument, PatientModel>(
    'Patient',
    PatientSchema
);

export { Patient }