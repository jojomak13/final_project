import { LocaleColumn } from '@hti/common';
import mongoose, { Schema, model } from 'mongoose';

interface LanguageAttrs {
  name: LocaleColumn[];
}

export interface LanguageDocument extends mongoose.Document {
  id: string;
  name: LocaleColumn[];
}

interface LanguageModel extends mongoose.Model<LanguageDocument> {
  build(attrs: LanguageAttrs): LanguageDocument;
}

const languageSchema = new Schema(
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

languageSchema.statics.build = (attrs: LanguageAttrs) => {
  return new Language(attrs);
};

const Language = model<LanguageDocument, LanguageModel>(
  'Language',
  languageSchema
);

export { Language };
