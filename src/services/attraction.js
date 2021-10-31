const axios = require('axios');
const FIWARE_URL = process.env.FIWARE_URL

const prueba = async (req, res, next) => {
    return await axios({
    url: `${FIWARE_URL}/version`,
    method: 'get',
    });
};

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

const fetchAll = async () => {
    return await axios({
        url: `${FIWARE_URL}/entities`,
        method: 'get',
        params: {
            options: "keyValues",
            type: "Attraction"
        }
    });
}

const fetchById = async (id) => {
    return await axios({
        url: `${FIWARE_URL}/entities/${id}`,
        method: 'get',
        params: { options: "keyValues" }
    });
}
// UPDATE ATRACCION NO ESTA IMPLEMENTADA HAY QUE HACERLA
const updateAttraction = async () => {
    return await axios({
        url: `${FIWARE_URL}/entities?type=Attraction?options=keyValues`,
        method: 'get',        
    });
}

const idMaker = async () => {
    const listIds = await fetchAll();
    if (listIds) {
        const num = listIds.data[listIds.data.length - 1].id.split(":");
        return (parseInt(num[3]) + 1).toString();
    }

}

module.exports = {
    prueba,
    create,
    fetchAll,
    updateAttraction,
    idMaker,
    fetchById
}
