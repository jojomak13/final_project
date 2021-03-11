import Joi from 'joi';

const create = Joi.object({
  organization: Joi.array()
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
  licensing_organization: Joi.string(),
  licensing_number: Joi.string(),
});

const destroy = Joi.object({
  id: Joi.string().required(),
});

export default { create, destroy };
