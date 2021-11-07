const axios = require('axios');
const moment = require('moment');
const FIWARE_URL = process.env.FIWARE_URL;
const dateFormat = "YYYY-MM-DD";
const mongoose = require('mongoose');

const create = async (userName , passwd, email, role) => {
    const id = new mongoose.Types.ObjectId();
    return await axios({
        url: `${FIWARE_URL}/entities`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
            "id": `urn:ngsi-ld:UserMunicipality:${id}`,
            "type": "UserMunicipality",
            "userName": { "value": userName },
            "passwd": { "value": passwd },
            "email": { "value": email },
            "role": { "value": role },
            "createdAt": { "value":  moment(new Date()).format(dateFormat) },
            "updatedAt": { "value":  moment(new Date()).format(dateFormat) },                        
            "isDeleted": { "value": false }
         }
    });
};

module.exports = {
    create,
}