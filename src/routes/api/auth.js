const { Router } = require('express');
const router = Router();
// const schema = require('../../schemas/auth');
// const { validate } = require('../middlewares')
const { AuthController } = require('../../controllers');

router.post('/login', AuthController.login);

module.exports = router;