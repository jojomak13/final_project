import { OrderStatus, PriceType } from '@hti/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import mongoose, { Schema, model } from 'mongoose';

interface OrderAttrs {
  id: string;
  patient_id: string;
  status: OrderStatus;
  price: PriceType;
  version: number;
}

export interface OrderDocument extends mongoose.Document {
  id: string;
  patient_id: string;
  status: OrderStatus;
  price: PriceType;
  version: number;
}

interface OrderModel extends mongoose.Model<OrderDocument> {
  build(attrs: OrderAttrs): OrderDocument;
}

const OrderSchema = new Schema(
  {
    patient_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      required: true,
    },
    price: {
      type: {
        amount: Number,
        currency: {
          type: String,
          enum: ['usd', 'egp'],
        },
      },
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

OrderSchema.plugin(updateIfCurrentPlugin);
OrderSchema.set('versionKey', 'version');

OrderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({ _id: attrs.id, ...attrs });
};

const Order = model<OrderDocument, OrderModel>('Order', OrderSchema);

export { Order };
