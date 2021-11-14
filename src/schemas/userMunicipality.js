const Joi = require('joi');

module.exports = Joi.object({
    userName: Joi.string().required(),
    passwd: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.number().required()
});