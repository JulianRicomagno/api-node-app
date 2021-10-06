const AttractionService = require('../services/attraction')

const prueba = async (req, res, next) => {
    try {
        AttractionService.prueba();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    prueba
}

