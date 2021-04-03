import { OrderStatus, OrderTypes } from '@hti/common';
import mongoose, { Schema, model } from 'mongoose';
import { Patient, PatientDocument } from './Patient';
import { Timeslot, TimeslotDocument } from './Timeslot';

interface OrderAttrs {
  timeslot: TimeslotDocument;
  patient: PatientDocument;
  type: OrderTypes;
  status: OrderStatus;
  expires_at: Date;
}

interface OrderDocument extends mongoose.Document {
  id: string;
  timeslot: TimeslotDocument;
  patient: PatientDocument;
  type: OrderTypes;
  status: OrderStatus;
  expires_at: Date;
}

interface OrderModel extends mongoose.Model<OrderDocument> {
  build(attrs: OrderAttrs): OrderDocument;
}

const OrderSchema = new Schema(
  {
    timeslot: {
      type: Schema.Types.ObjectId,
      ref: Timeslot,
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: Patient,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(OrderTypes),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      required: true,
    },
    expires_at: {
      type: Date,
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

OrderSchema.set('versionKey', 'version');

OrderSchema.statics.build = (atters: OrderAttrs) => {
  return new Order(atters);
};

const Order = model<OrderDocument, OrderModel>('Order', OrderSchema);

export { Order };
