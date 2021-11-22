const schema = require('../../schemas/userTourist');
const { validate } = require('../middlewares')
const { UserTouristController } = require('../../controllers');

module.exports = router => {
    router.get('/fetchall', UserTouristController.fetchAll);
    router.delete('/delete', UserTouristController.deleteUser);
    router.post('/update', UserTouristController.update);
    router.post('/updateitinerary', UserTouristController.updateItinerary);
    router.post('/updatepassword', UserTouristController.updatePassword);
    router.get('/search/:id', UserTouristController.fetchById);
    return router;
}

