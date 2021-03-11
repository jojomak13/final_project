import Joi from 'joi';

const create = Joi.object({
  school: Joi.array()
    .items(
      Joi.object({
        lang: Joi.string(),
        value: Joi.string(),
      })
    )
    .required(),
  degree: Joi.array()
    .items(
      Joi.object({
        lang: Joi.string(),
        value: Joi.string(),
      })
    )
    .required(),
  from: Joi.date().required(),
  to: Joi.date(),
});

const destroy = Joi.object({
  id: Joi.string().required(),
});

export default { create, destroy };
