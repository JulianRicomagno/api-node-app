const axios = require('axios');
const moment = require('moment');
const FIWARE_URL = process.env.FIWARE_URL;
const dateFormat = "YYYY-MM-DD";
const mongoose = require('mongoose');

const fetchAll = async (typeEntity) => {
    const response = await axios({
        url: `${FIWARE_URL}/entities`,
        method: 'get',
        params: {
            type: typeEntity,
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

const searchByName = async (typeEntity, name) => {
    const response = await axios({
        url: `${FIWARE_URL}/entities/`,
        method: 'get',
        params: {
            type: typeEntity,
            q: `name==${name}`,
            options: "keyValues",
        }
    });
    return response.data;
}

const logicDeleteEntity = async (id) => {
    const response = await axios({
        url: `${FIWARE_URL}/entities/${id}/attrs/`,
        method: 'patch',
        params: { options: "keyValues" }, 
        data: {
            "isDeleted": true,
        }
    });
    return response;
}

module.exports = {
    fetchById,
    searchByName,
    fetchAll,
    logicDeleteEntity,
}