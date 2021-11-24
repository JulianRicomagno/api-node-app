const { StatisticController } = require('../../controllers');

module.exports = router => {
    router.get('/fetchall', StatisticController.fetchAll);
    router.post('/import', StatisticController.importData);
    return router;
}
