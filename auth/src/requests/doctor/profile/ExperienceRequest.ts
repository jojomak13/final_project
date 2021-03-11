import Joi from 'joi';

const create = Joi.object({
  name: Joi.array()
    .items(
      Joi.object({
        lang: Joi.string(),
        value: Joi.string(),
      })
    )
    .required(),
  title: Joi.array()
    .items(
      Joi.object({
        lang: Joi.string(),
        value: Joi.string(),
      })
    )
    .required(),
  from: Joi.date().required(),
  to: Joi.date(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

const destroy = Joi.object({
  id: Joi.string().required(),
});

export default { create, destroy };
