const validateJWT  = require('./validate-jwt')
const validate = require('./validate');

module.exports = {
    ...validate,
    ...validateJWT
}