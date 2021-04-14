import { OrderStatus, OrderTypes, PriceType } from '@hti/common';
import moment from 'moment';
import mongoose, { Schema, model } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Duration } from './enums/DurationEnum';
import { Patient, PatientDocument } from './Patient';
import { Timeslot, TimeslotDocument } from './Timeslot';

interface OrderAttrs {
  timeslot: TimeslotDocument;
  patient: PatientDocument;
  type: OrderTypes;
  status: OrderStatus;
  expires_at: Date;
  price?: PriceType;
}

interface OrderDocument extends mongoose.Document {
  id: string;
  timeslot: TimeslotDocument;
  patient: PatientDocument;
  type: OrderTypes;
  status: OrderStatus;
  expires_at: Date;
  price: PriceType;
  version: number;
  isValidReschedule(timeslot: TimeslotDocument): boolean;
  setPrice(
    timeslot: TimeslotDocument,
    orderType: OrderTypes,
    countryName: string
  ): Boolean;

  canRefund(timeslot: TimeslotDocument): Boolean;
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

OrderSchema.plugin(updateIfCurrentPlugin);
OrderSchema.set('versionKey', 'version');

OrderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

OrderSchema.methods.isValidReschedule = function (timeslot) {
  return (
    // @ts-ignore
    this.timeslot.doctor.toString() === timeslot.doctor.toString() &&
    // @ts-ignore
    this.status === OrderStatus.Paid
  );
};

OrderSchema.methods.setPrice = function (timeslot, orderType, countryName) {
  const currency = countryName.toLowerCase() === 'egypt' ? 'egp' : 'usd';
  const duration = timeslot.duration === Duration.fullHour ? 'full' : 'half';

  const price = timeslot.doctor.fees[orderType][currency][duration];

  this.set('price', {
    amount: price,
    currency,
  });

  return true;
};

OrderSchema.methods.canRefund = function (timeslot: TimeslotDocument): Boolean {
  const fromOrdering = moment
    .duration(moment().diff(this.get('created_at')))
    .asHours();

  const fromStart = moment
    .duration(moment(timeslot.start_time).diff(moment(this.get('created_at'))))
    .asHours();

  const isPaid = this.get('status') === OrderStatus.PaymentComplete;

  if (Math.floor(fromOrdering) < 12 && Math.floor(fromStart) > 6 && isPaid)
    return true;

  return false;
};

const Order = model<OrderDocument, OrderModel>('Order', OrderSchema);

export { Order };
