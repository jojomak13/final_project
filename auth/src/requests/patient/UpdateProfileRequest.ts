import Joi from 'joi';
import { Gender } from '../../models/enums/gender';

const UpdateProfileRequest = Joi.object({
  name: Joi.string().required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),

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

  date_of_birth: Joi.date().max('1-1-2005').required(),

  image: Joi.any()
    .meta({ swaggerType: 'file' })
    .optional()
    .allow('')
    .description('image file'),

  country: Joi.string().required(),
}).with('password', 'repeat_password');

export { UpdateProfileRequest };
