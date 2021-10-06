const { Router } = require('express');
const router = Router();
const AttractionController = require('../../controllers/attraction')

router.get('/prueba', AttractionController.prueba);

module.exports = router;