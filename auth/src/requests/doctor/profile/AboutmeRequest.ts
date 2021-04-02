import { Prefix } from '@hti/common';
import Joi from 'joi';

const AboutmeRequest = Joi.object({
  title: Joi.array()
    .items(
      Joi.object({
        lang: Joi.string().required(),
        value: Joi.string().required(),
      })
    )
    .required(),

  biography: Joi.array()
    .items(
      Joi.object({
        lang: Joi.string().required(),
        value: Joi.string().required(),
      })
    )
    .required(),

  prefix: Joi.any()
    .valid(...Object.values(Prefix))
    .required(),

  languages: Joi.array().items(
    Joi.object({
      lang: Joi.string().required(),
      value: Joi.string().required(),
    })
  ),

  specialization: Joi.array().items(Joi.string()).required(),

  main_focus: Joi.array().items(Joi.string()).required(),
});

export { AboutmeRequest };
