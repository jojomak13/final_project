import Joi from 'joi';

const feesSchema = Joi.object({
  usd: Joi.object({
    half: Joi.number().required(),
    full: Joi.number().required(),
  }).required(),
  egp: Joi.object({
    half: Joi.number().required(),
    full: Joi.number().required(),
  }).required(),
}).required();

const SessionFeesRequest = Joi.object({
  video: feesSchema,
  chat: feesSchema,
  audio: feesSchema,
}).required();

export { SessionFeesRequest };
