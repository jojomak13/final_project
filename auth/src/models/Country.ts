import mongoose, { model, Schema } from 'mongoose';

interface CountryAttrs {
  name: string;
  code: string;
  currency: string;
  timezone: string;
}

export interface CountryDocument extends mongoose.Document {
  id: string;
  name: string;
  code: string;
  currency: string;
  timezone: string;
}

interface CountryModel extends mongoose.Model<CountryDocument> {
  build(atters: CountryAttrs): CountryDocument;
}

const CountrySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    timezone: {
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

CountrySchema.set('versionKey', 'version');

CountrySchema.statics.build = (atters: CountryAttrs) => {
  return new Country(atters);
};

const Country = model<CountryDocument, CountryModel>('Country', CountrySchema);

export { Country };
