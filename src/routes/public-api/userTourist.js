const schema = require('../../schemas/userTourist');
const { validate } = require('../middlewares')
const { UserTouristController } = require('../../controllers');

module.exports = router => {
    router.post('/create', validate(schema), UserTouristController.create);
    return router;
}