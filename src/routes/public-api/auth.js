const schema = require('../../schemas/auth');
const { validate } = require('../middlewares')
const { AuthController } = require('../../controllers');

module.exports = router => {
    router.post('/login', validate(schema), AuthController.login);
    router.post('/recuperarpassword', AuthController.passRecovery);
    return router;
}