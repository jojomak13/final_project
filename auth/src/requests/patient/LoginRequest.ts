import Joi from 'joi';

const LoginRequest = Joi.object({
  password: Joi.string().required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
});

export { LoginRequest };
