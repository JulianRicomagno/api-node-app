const { Router } = require('express');
const router = Router();
const AttractionController = require('../../controllers/attraction')

router.get('/pruebafiware', AttractionController.pruebaFiware);
router.post('/create', AttractionController.create);
router.get('/fetchall', AttractionController.fetchAll);
router.get('/id', AttractionController.fetchById);
router.get('/update', AttractionController.update);

module.exports = router;