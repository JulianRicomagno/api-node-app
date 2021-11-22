const {Router} = require('express');
const { validateJWT } = require('./middlewares/validate-jwt');

class Routes {
    static configure(app) {
        app.use('/api' , require('./api')(Router()));
        app.use('/public-api', require('./public-api')(Router()));
    }
}

module.exports = Routes;