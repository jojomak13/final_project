import Joi from 'joi';

const SessionFeesRequest = Joi.object({
  video: Joi.object({
    usd: Joi.object({
      half: Joi.number().required(),
      full: Joi.number().required(),
    }).required(),
    pound: Joi.object({
      half: Joi.number().required(),
      full: Joi.number().required(),
    }).required(),
  }).required(),
});

export { SessionFeesRequest };
