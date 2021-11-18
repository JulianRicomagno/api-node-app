const schema = require('../../schemas/userTourist');
const { validate } = require('../middlewares')
const { UserTourist } = require('../../controllers');

module.exports = router => {
    router.post('/create', validate(schema), UserTourist.create);
    return router;
}