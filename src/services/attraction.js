const axios = require('axios');
const moment = require('moment');
const FIWARE_URL = process.env.FIWARE_URL;
const dateFormat = "YYYY-MM-DD";
const mongoose = require('mongoose');
const Utils = require('../util/utils')

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
    const dataUpdate = Utils.cleanKeys(attraction,["id","type"]);
    return await axios({
        url: `${FIWARE_URL}/entities/${attraction.id}/attrs/`,
        method: 'patch',
        params: { options: "keyValues" },        
        data: {
            ...dataUpdate,
            "updatedAt": moment(new Date()).format(dateFormat),                           
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
