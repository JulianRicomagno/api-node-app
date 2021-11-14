const Joi = require('joi');

module.exports = Joi.object({
    email: Joi.string().email().required(),
    passwd: Joi.string().required(),
    device: Joi.string().required()
});
