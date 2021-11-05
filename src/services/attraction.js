const axios = require('axios');
const moment = require('moment');
const FIWARE_URL = process.env.FIWARE_URL;
const dateFormat = "YYYY-MM-DD";
const mongoose = require('mongoose');

const prueba = async (req, res, next) => {
    return await axios({
    url: `${FIWARE_URL}/version`,
    method: 'get',
    });
};

// Completar atributos   INVESTIGAR COMO MANDAR LOCATION Y DATE HOUR
const create = async (name , description, typeAttraction, image, rating, dateHour, location, address) => {
    const id = new mongoose.Types.ObjectId();
    return await axios({
        url: `${FIWARE_URL}/entities`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            "id": `urn:ngsi-ld:Attraction:${id}`,
            "type": "Attraction",
            "name": { "value": name },
            "image": { "value": image },
            "rating": { "value": rating },
            "dateAndHour": { "value": dateHour },
            "location": { "value": location },
            "address": { "value": address },                        
            "description": { "value": description },
            "typeAttraction": { "value": typeAttraction },
            "createdAt": { "value":  moment(new Date()).format(dateFormat) },
            "updatedAt": { "value":  moment(new Date()).format(dateFormat) },                        
            "isDeleted": { "value": false }
         }
    });
};

// Filtrar para que solo se vean las isDeleted = false.
const fetchAll = async () => {
    const response = await axios({
        url: `${FIWARE_URL}/entities`,
        method: 'get',
        params: {
            type: "Attraction",
            q: `isDeleted==false`,
            options: "keyValues",            
        }
    });
    return response.data;
}

const fetchById = async (id) => {
    const response = await axios({
        url: `${FIWARE_URL}/entities/${id}`,
        method: 'get',
        params: { options: "keyValues" }
    });
    return response.data;
}
// UPDATE ATRACCION NO ESTA IMPLEMENTADA HAY QUE HACERLA
const update = async (id, name, image, rating , dateHour, location, address, createdAt,description, typeAttraction, isDeleted) => {
    return await axios({
        url: `${FIWARE_URL}/entities/${id}/attrs/`,
        method: 'patch',
        params: { options: "keyValues" },        
        data: {
            "name": name ,
            "image":  image ,
            "rating": rating ,
            "dateAndHour": dateHour ,
            "location": location ,
            "address": address ,                        
            "description": description ,
            "typeAttraction": typeAttraction ,
            "createdAt": createdAt ,
            "updatedAt": moment(new Date()).format(dateFormat),                        
            "isDeleted": isDeleted     
        }
    });
}

// Sirve para user
const searchByname = async (name) => {
    const response = await axios({
        url: `${FIWARE_URL}/entities/`,
        method: 'get',
        params: {
            type: "Attraction",
            q: `name==${name}`,
            options: "keyValues",
        }
    });
    return response.data;
}

const searchByType = async (typeAttraction) => {
    const response = await axios({
        url: `${FIWARE_URL}/entities/`,
        method: 'get',
        params: {
            type: "Attraction",
            q: `typeAttraction==${typeAttraction}`,
            options: "keyValues",
        }
    });
    return response.data;
}

module.exports = {
    prueba,
    create,
    fetchAll,
    update,
    fetchById,
    searchByname,
    searchByType
}
