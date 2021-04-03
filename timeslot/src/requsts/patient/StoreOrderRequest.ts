import { OrderTypes } from '@hti/common';
import Joi from 'joi';


const StoreOrderReruest = Joi.object({
    timeslot_id: Joi.string().required(),
    type: Joi.any()
    .valid(...Object.values(OrderTypes))
    .required(),
});