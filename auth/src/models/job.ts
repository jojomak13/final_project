import { LocaleColumn } from '@hti/common';
import mongoose from 'mongoose';

interface JobAttrs {
  name: LocaleColumn[];
}

export interface JobDocument extends mongoose.Document {
  id: string;
  name: LocaleColumn[];
}

interface JobModel extends mongoose.Model<JobDocument> {
  build(atters: JobAttrs): JobDocument;
}

const JobSchema = new mongoose.Schema({
  name: {
    type: [
      {
        lang: String,
        value: String,
      },
    ],
    required: true,
  },
});

JobSchema.statics.build = (atters: JobAttrs) => {
  return new Job(atters);
};

const Job = mongoose.model<JobDocument, JobModel>('Job', JobSchema);

export { Job };
