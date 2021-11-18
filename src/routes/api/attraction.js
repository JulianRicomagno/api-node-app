const schema = require('../../schemas/attraction');
const { validate } = require('../middlewares')
const { AttractionController } = require('../../controllers');

module.exports = router => {
    router.post('/create', validate(schema), AttractionController.create);
    router.get('/fetchall', AttractionController.fetchAll);
    router.get('/searchbyid/:id', AttractionController.fetchById);
    router.patch('/update', AttractionController.update);
    router.get('/searchbyname/:name', AttractionController.searchByname);
    router.get('/searchbytype/:type', AttractionController.searchByType);
    router.get('/types', AttractionController.types);
    return router;
}

