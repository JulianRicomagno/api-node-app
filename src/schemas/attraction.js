const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    rating: Joi.number().required(),
    dateHour: Joi.string().required(),
    address: Joi.string().required(),
    description: Joi.string().required(),
    typeAttraction: Joi.string().required(),    
});
