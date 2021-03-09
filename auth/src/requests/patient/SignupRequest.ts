import Joi from 'joi';
import { Gender } from '../../models/enums/gender';

const SignupRequest = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),

  repeat_password: Joi.ref('password'),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),

  phone: Joi.string().trim().pattern(new RegExp('^[+0-9]{7,14}$')).required(),

  gender: Joi.any()
    .valid(...Object.values(Gender))
    .required(),

  date_of_birth: Joi.date().min('1-1-2005').required(),

  country: Joi.number().required(),
});

export { SignupRequest };
