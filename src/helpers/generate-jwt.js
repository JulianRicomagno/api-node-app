const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const { ERROR } = require('../helpers');

exports.generateJwt = (_id) => {
    
    return new Promise((resolve, reject) => {
        const payload = { _id };
        jwt.sign(payload, SECRET_KEY, {
            expiresIn: '31d'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(ERROR.ERROR_JWT_TOKEN);   
            } else {
                resolve(token);
            }
        })
    })
}
