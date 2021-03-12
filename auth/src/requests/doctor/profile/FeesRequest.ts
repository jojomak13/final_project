import Joi from 'joi';

const feesSchema = Joi.object({
  usd: Joi.object({
    half: Joi.number().required(),
    full: Joi.number().required(),
  }).required(),
  pound: Joi.object({
    half: Joi.number().required(),
    full: Joi.number().required(),
  }).required(),
}).required();

const SessionFeesRequest = Joi.array()
  .items(
    Joi.object({
      video: feesSchema,
    })
  )
  .required();

export { SessionFeesRequest };
