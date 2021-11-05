const { Router } = require('express');
const router = Router();
const { AttractionController } = require('../../controllers');

router.get('/pruebafiware', AttractionController.pruebaFiware);
router.post('/create', AttractionController.create);
router.get('/fetchall', AttractionController.fetchAll);
router.get('/id', AttractionController.fetchById);
router.patch('/update', AttractionController.update);
router.get('/search', AttractionController.searchByname);
router.get('/search/type', AttractionController.searchByType);
router.get('/types', AttractionController.types);

module.exports = router;