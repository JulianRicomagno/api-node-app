const AttractionService = require('../services/attraction');

const pruebaFiware = async (req, res, next) => {
    try {
        const response = await AttractionService.idMaker();
        res.send(`${response}`);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const { name, description, type } = req.body;
        const response = await AttractionService.create(name, description, type);
        if (response) {
            res.json({ 'msg' : 'ok'});
        }
    } catch (err) {
        next(err);
    }
};

const fetchAll = async (req, res, next) => {
    try {
        const response = await AttractionService.fetchAll();
        res.send(response.data);
    } catch (err) {
        
    }
};

const fetchById = async (req, res, next) => {
    try {
        const { id } = req.body;
        const response = await AttractionService.fetchById(id);      
        res.send(response.data);
    } catch (err) {
        
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.body;
        const response = await AttractionService.fetchById(id);      
        res.send(response.data);
    } catch (err) {
        
    }
}


module.exports = {
    pruebaFiware,
    create,
    fetchAll,
    fetchById,
    update
}

