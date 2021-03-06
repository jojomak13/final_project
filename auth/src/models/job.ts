import mongoose from 'mongoose';

interface JobAttrs {
    name_en: string,
    name_ar: string
}

interface JobDocument extends mongoose.Document {
    id: string,
    name_en: string,
    name_ar: string
}

interface JobModel extends mongoose.Model<JobDocument> {
    build(atters: JobAttrs): JobDocument;
}

const JobSchema = new mongoose.Schema({
    name_en: {
        type: String,
        required: true
    },
    name_ar: {
        type: String,
        required: true
    },
});

JobSchema.statics.build = (atters: JobAttrs) => {
    return new Job(atters);
}

const Job = mongoose.model<JobDocument, JobModel>(
    'Job',
    JobSchema
);

export { Job }