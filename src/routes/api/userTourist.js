const schema = require('../../schemas/userTourist');
const { validate } = require('../middlewares')
const { UserTourist } = require('../../controllers');

module.exports = router => {
    router.post('/create', validate(schema), UserTourist.create);
    router.get('/fetchall', UserTourist.fetchAll);
    router.delete('/delete', UserTourist.deleteUser);
    router.post('/update', UserTourist.update);
    router.post('/updateitinerary', UserTourist.updateItinerary);
    return router;
}

