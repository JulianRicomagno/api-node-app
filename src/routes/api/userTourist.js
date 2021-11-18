const schema = require('../../schemas/userTourist');
const { validate } = require('../middlewares')
const { UserTourist } = require('../../controllers');

module.exports = router => {
    router.get('/fetchall', UserTourist.fetchAll);
    router.delete('/delete', UserTourist.deleteUser);
    router.post('/update', UserTourist.update);
    router.post('/updateitinerary', UserTourist.updateItinerary);
    router.get('/fetchbyid', UserTourist.fetchById);
    return router;
}

