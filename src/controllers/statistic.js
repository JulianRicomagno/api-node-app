const { CrudService } = require('../services');
const { StatisticService } = require('../services');

const create = async (req, res, next) => {
    try {
        

        if (response) {
            res.json({ 'msg' : 'ok'});
        }
    } catch (err) {
        next(err);
    }
};

const fetchAll = async (req, res, next) => {
    try {
        const response = await CrudService.fetchAll("Statistic");
        res.send(response);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    create,
    fetchAll
};