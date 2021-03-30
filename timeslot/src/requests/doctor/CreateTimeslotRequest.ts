import Joi from 'joi';
import { Duration } from '../../models/enums/DurationEnum';

const CreateTimeslotRequest = Joi.object({
  start_day: Joi.date().required(),
  start_time: Joi.date().timestamp('unix').required(),
  is_bulk: Joi.boolean().default(false),
  end_day: Joi.date()
    .greater(Joi.ref('start_day'))
    .when('is_bulk', {
      is: Joi.equal(true),
      then: Joi.date().required(),
    }),
  duration: Joi.any()
    .valid(...Object.values(Duration))
    .required(),
});

export { CreateTimeslotRequest };
