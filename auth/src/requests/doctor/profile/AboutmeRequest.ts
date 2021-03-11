import Joi from 'joi';

const AboutmeRequest = Joi.object({
    title: Joi.array().items(
        Joi.object({
            lang: Joi.string(),
            value: Joi.string()
        })
    ),

    biography: Joi.array().items(
        Joi.object({
            lang: Joi.string(),
            value: Joi.string()
        })
    ),

    prefix: Joi.array().items(
        Joi.object({
            lang: Joi.string(),
            value: Joi.string()
        })
    ),

    languages: Joi.array().items(
        Joi.object({
            lang: Joi.string(),
            value: Joi.string()
        })
    ),

    specialization: Joi.array().items(
        Joi.object({
            lang: Joi.string(),
            value: Joi.string()
        })
    ),
});

export { AboutmeRequest };