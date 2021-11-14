const Joi = require('joi');

module.exports = Joi.object({
    userName: Joi.string().required(),
    passwd: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().required(),
    nationality: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    gender: Joi.string().required()
});