import mongoose, { Schema, model } from 'mongoose';
import { TimeslotDocument } from './Timeslot';

interface OrderAtters {
  timeSolt: TimeslotDocument;
  // TODO patient document
  patient: string;
  type: SessionType;
  status?: SessionStatus;
  expiresAt?: string;
}

interface OrderDocument extends mongoose.Document {
  id: string;
  timeSolt: TimeslotDocument;
  // TODO patient document
  patient: string;
  type: SessionType;
  status?: SessionStatus;
  expiresAt?: string;
}

interface OrderModel extends mongoose.Model<OrderDocument> {
  build(atters: OrderAtters): OrderDocument;
}

const OrderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
 
    image: {
      type: String,
    }

  },
  {
    versionKey: false,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

OrderSchema.set('versionKey', 'version');

OrderSchema.statics.build = (atters: OrderAtters) => {
  return new Order(atters);
};

const Order = model<OrderDocument, OrderModel>('Patient', OrderSchema);

export { Order };
