import mongoose, { Schema, model } from 'mongoose';
import Stripe from 'stripe';
import { stripe } from '../stripe';
import { Order, OrderDocument } from './Order';

export enum providerType {
  STRIPE = 'stripe',
}

export enum statusType {
  PAID = 'paid',
  REFUND = 'refund',
}

interface PaymentAttrs {
  order: OrderDocument;
  provider_id: string;
  provider: providerType;
  status?: statusType;
}

interface PaymentDocument extends mongoose.Document {
  id: string;
  order: OrderDocument;
  provider_id: string;
  provider: providerType;
  status: statusType;
  refund(): Promise<Stripe.Response<Stripe.Refund>>;
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
    status: {
      type: statusType,
      enum: Object.values(statusType),
      default: statusType.PAID,
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

PaymentSchema.methods.refund = async function () {
  const token = this.get('provider_id');

  const refund = await stripe.refunds.create({
    charge: token,
  });

  return refund;
};

const Payment = model<PaymentDocument, PaymentModel>('Payment', PaymentSchema);

export { Payment };
