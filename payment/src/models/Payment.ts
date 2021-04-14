import mongoose, { Schema, model } from 'mongoose';
import { Order, OrderDocument } from './Order';

export enum providerType {
  STRIPE = 'stripe',
}

interface PaymentAttrs {
  order: OrderDocument;
  provider_id: string;
  provider: providerType;
}

interface PaymentDocument extends mongoose.Document {
  id: string;
  order: OrderDocument;
  provider_id: string;
  provider: providerType;
}

interface PaymentModel extends mongoose.Model<PaymentDocument> {
  build(attrs: PaymentAttrs): PaymentDocument;
}

const PaymentSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: Order,
      required: true,
    },
    provider_id: {
      type: String,
      required: true,
    },
    provider: {
      type: providerType,
      enum: Object.values(providerType),
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

PaymentSchema.set('versionKey', 'version');

PaymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

const Payment = model<PaymentDocument, PaymentModel>('Payment', PaymentSchema);

export { Payment };
