import mongoose, { Schema, model } from 'mongoose';

interface LanguageAttrs {
  name_en: string;
  name_ar: string;
}

export interface LanguageDocument extends mongoose.Document {
  id: string;
  name_en: string;
  name_ar: string;
}

interface LanguageModel extends mongoose.Model<LanguageDocument> {
  build(attrs: LanguageAttrs): LanguageDocument;
}

const languageSchema = new Schema(
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

languageSchema.statics.build = (attrs: LanguageAttrs) => {
  return new Language(attrs);
};

const Language = model<LanguageDocument, LanguageModel>(
  'Language',
  languageSchema
);

export { Language };
