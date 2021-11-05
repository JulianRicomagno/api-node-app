const { Router } = require('express');
const router = Router();
const { UserMunicipalityController } = require('../../controllers');

router.post('/create', UserMunicipalityController.create);
router.get('/fetchall', UserMunicipalityController.fetchAll);

module.exports = router;