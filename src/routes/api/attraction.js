const schema = require('../../schemas/attraction');
const { validate } = require('../middlewares')
const { AttractionController } = require('../../controllers');

module.exports = router => {
    router.post('/create', validate(schema), AttractionController.create);
    router.get('/fetchall', AttractionController.fetchAll);
    router.get('/id', AttractionController.fetchById);
    router.patch('/update', AttractionController.update);
    router.get('/search', AttractionController.searchByname);
    router.get('/search/type', AttractionController.searchByType);
    router.get('/types', AttractionController.types);
    return router;
}

