const { AttractionService } = require('../services');

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
        console.log(req.body);
        const { name,
            description,
            typeAttraction,
            image,
            rating,
            dateHour,
            location,
            address} = req.body;
        
        const response = await AttractionService.create(name , description, typeAttraction, image, rating, dateHour, location, address);
        if (response) {
            res.json({ 'msg' : 'ok'});
        }
    } catch (err) {
        console.log(err);
    }
};

const fetchAll = async (req, res, next) => {
    try {
        const response = await AttractionService.fetchAll();
        res.send(response);
    } catch (err) {
        next(err);
    }
};

const fetchById = async (req, res, next) => {
    try {
        const { id } = req.body;
        const response = await AttractionService.fetchById(id);
        res.send(response);
    } catch (err) {
        res.status(400).json(err.response.data);
    }
}

const update = async (req, res, next) => {
    try {
        const { id,
            name,
            image,
            rating,
            dateHour,
            location,
            address,
            createdAt,
            description,
            typeAttraction,
            isDeleted } = req.body;
        const response = await AttractionService.update(id, name, image, rating , dateHour, location, address, createdAt,description, typeAttraction, isDeleted);      
        if (response.status == 204) {
            res.status(200).json(
                {
                    "msg": "Update ok"
                }
            )
        }
    } catch (err) {
        res.send(err);
    }
}

const searchByname = async (req, res, next) => {
    try {
        const { name } = req.body;
        const response = await AttractionService.searchByname(name);
        res.send(response)
    } catch (err) {
        res.send(err);
    }
}

const searchByType = async (req, res, next) => {
    try {
        const { typeAttraction } = req.body;
        const response = await AttractionService.searchByType(typeAttraction);
        res.send(response)
        console.log(response)
    } catch (err) {
        res.send(err);
    }
}

module.exports = {
    pruebaFiware,
    create,
    fetchAll,
    fetchById,
    update,
    searchByname,
    searchByType
}

