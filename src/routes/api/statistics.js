const { Router } = require('express');
const router = Router();
const { StatisticController } = require('../../controllers');

router.get('/fetchall', StatisticController.fetchAll);

module.exports = router;