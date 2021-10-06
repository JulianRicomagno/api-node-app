const { Router } = require('express');
const UserController = require('../../controllers/userTourist');
const router = Router();

router.put('/add', UserController.addUser);

module.exports = router;
