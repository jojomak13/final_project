import Joi from 'joi';

const create = Joi.object({
  organization: Joi.array()
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
  licensing_organization: Joi.string(),
  licensing_number: Joi.string(),
});

const destroy = Joi.object({
  id: Joi.string().required(),
});

export default { create, destroy };
