import mongoose from 'mongoose';

interface EducationAttrs {
    school_en: string,
    school_ar: string,
    degree_en: string,
    degree_ar: string,
    from: string,
    to?: string,
    doctor: string
}

interface EducationDocument extends mongoose.Document {
    id: string;
    school_en: string,
    school_ar: string,
    degree_en: string,
    degree_ar: string,
    from: string,
    to?: string,
    doctor: string
}

interface EducationModel extends mongoose.Model<EducationDocument> {
    build(atters: EducationAttrs): EducationDocument;
}

const EducationSchema = new mongoose.Schema({
    school_en: {
        type: String,
        required: true
    },
    school_ar: {
        type: String,
        required: true
    },
    degree_en: {
        type: String,
        required: true
    },
    degree_ar: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String
    },
    doctor: {
        type: String,
        required: true
    }
});

EducationSchema.statics.build = (atters: EducationAttrs) => {
    return new Education(atters);
}

const Education = mongoose.model<EducationDocument, EducationModel>(
    'Education',
    EducationSchema
);

export { Education }