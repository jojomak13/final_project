import Joi from 'joi';

const create = Joi.object({
  name: Joi.array()
    .items(
      Joi.object({
        lang: Joi.string().required(),
        value: Joi.string().required(),
      })
    )
    .required(),
  title: Joi.array()
    .items(
      Joi.object({
        lang: Joi.string().required(),
        value: Joi.string().required(),
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
