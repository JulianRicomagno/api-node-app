const { CrudService, StatisticService } = require('../services');

const fetchAll = async (req, res, next) => {
    try {
        const response = await CrudService.fetchAll("Statistic");
        res.send(response);
    } catch (err) {
        next(err);
    }
};

const importData = async (req, res, next) => {
    try {
        const data = req.body;
        data.forEach(statistic => { StatisticService.create(data.generalInfo, data.newAttraction) });

        res.json({ 'msg' : 'ok'});

    } catch (err) {
        next(err);
    }
}

module.exports = {
    fetchAll,
    importData
};