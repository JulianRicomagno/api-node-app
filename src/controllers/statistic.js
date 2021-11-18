const { CrudService } = require('../services');

const fetchAll = async (req, res, next) => {
    try {
        const response = await CrudService.fetchAll("Statistic");
        res.send(response);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    fetchAll
};