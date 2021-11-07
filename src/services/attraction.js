const axios = require('axios');
const moment = require('moment');
const FIWARE_URL = process.env.FIWARE_URL;
const dateFormat = "YYYY-MM-DD";
const mongoose = require('mongoose');

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

const update = async (attraction) => {
    return await axios({
        url: `${FIWARE_URL}/entities/${attraction.id}/attrs/`,
        method: 'patch',
        params: { options: "keyValues" },        
        data: {
            "name": attraction.name ,
            "image":  attraction.image ,
            "rating": attraction.rating ,
            "dateAndHour": attraction.dateHour ,
            "location": attraction.location ,
            "address": attraction.address ,                        
            "description": attraction.description ,
            "typeAttraction": attraction.typeAttraction ,
            "createdAt": attraction.createdAt ,
            "updatedAt": moment(new Date()).format(dateFormat),                        
            "isDeleted": attraction.isDeleted     
        }
    });
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
    create,
    update,
    searchByType
}
