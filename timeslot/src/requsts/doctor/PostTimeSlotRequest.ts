import Joi from 'joi';
import { Duration } from '../../models/enums/DurationEnum';

const PostTimeSlotRequest = Joi.object({    
    strat_day: Joi.date().required(),
    start_time: Joi.date().timestamp('unix').required(),
    is_bulk: Joi.boolean().default(false),
    end_day: Joi.date().greater(Joi.ref('strat_day')).when('is_bulk', {
      is: Joi.equal(true),
      then: Joi.date().required(),
    }),
    duration: Joi.any()
    .valid(...Object.values(Duration))
    .required()
  });
  
  export { PostTimeSlotRequest };