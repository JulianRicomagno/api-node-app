const axios = require('axios');
const FIWARE_URL = process.env.FIWARE_URL

const prueba = async (req, res, next) => {
    return await axios({
    url: `${FIWARE_URL}/version`,
    method: 'get',
    });
};

// Completar atributos
const create = async (name , description, type) => {
    const id = await idMaker();
    return await axios({
        url: `${FIWARE_URL}/entities`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            "id": `urn:ngsi-ld:Attraction:${id}`,
            "type": "Attraction",
            "name": {"value": name},
            "description": { "value": description },
            "typeAttraction": { "value": type },
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
            options: "keyValues",
            type: "Attraction"
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
const update = async (id, name, description, typeAttraction, isDeleted) => {
    return await axios({
        url: `${FIWARE_URL}/entities/${id}/attrs/`,
        method: 'patch',
        params: { options: "keyValues" },        
        data: {
                "name": name,
                "description": description,
                "typeAttraction": typeAttraction,
                "isDeleted": isDeleted
    
        }
    });
}

const idMaker = async () => {
    const listIds = await fetchAll();
    if (listIds) {
        const num = listIds.data[listIds.data.length - 1].id.split(":");
        return (parseInt(num[3]) + 1).toString();
    }

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

module.exports = {
    prueba,
    create,
    fetchAll,
    update,
    idMaker,
    fetchById,
    searchByname
}
