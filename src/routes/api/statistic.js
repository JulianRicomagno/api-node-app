const { StatisticController } = require('../../controllers');

module.exports = router => {
    router.get('/fetchall', StatisticController.fetchAll);
    return router;
}
