const { AttractionService } = require('../services');
const { TypeAttraction } = require('../constants/typeAttraction');
const { CrudService } = require('../services')

const create = async (req, res, next) => {
    try {
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
        next(err);
    }
};

const fetchAll = async (req, res, next) => {
    try {
        const response = await CrudService.fetchAll("Attraction");
        res.send(response);
    } catch (err) {
        next(err);
    }
};

const fetchById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await CrudService.fetchById(id);
        res.send(response);
    } catch (err) {
        res.status(400).json(err.response.data);
    }
}

const update = async (req, res, next) => {
    try {
        const response = await CrudService.update(req.body);      
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
        const name = req.params.name
        const response = await CrudService.searchByName("Attraction", name);
        res.send(response)
    } catch (err) {
        res.send(err);
    }
}

const searchByType = async (req, res, next) => {
    try {
        const typeAttraction = req.params.type;
        console.log(typeAttraction)
        const response = await AttractionService.searchByType(typeAttraction);
        //Hacer filtro de las no borradas
        res.send(response)
    } catch (err) {
        res.send(err);
    }
}

const types = async (req, res, next) => {
    try {
        res.json(TypeAttraction)
    } catch (err) {
        res.send(err);
    }
}

const importData = async (req, res, next) => {
    try {
        const data = req.body;
        data.forEach(attraction => { AttractionService.create(attraction.name, attraction.description, attraction.typeAttraction, attraction.image, attraction.rating, attraction.dateHour, attraction.location, attraction.address) });

        res.json({ 'msg' : 'ok'});

    } catch (err) {
        next(err);
    }
}

module.exports = {
    create,
    fetchAll,
    fetchById,
    update,
    searchByname,
    searchByType,
    types,
    importData
}

