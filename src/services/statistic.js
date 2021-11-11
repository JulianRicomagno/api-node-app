const axios = require('axios');
const moment = require('moment');
const FIWARE_URL = process.env.FIWARE_URL;
const dateFormat = "YYYY-MM-DD";
const mongoose = require('mongoose');

const create = async (newAttraction, generalInfo) => {

    const id = new mongoose.Types.ObjectId();
    return await axios({
        url: `${FIWARE_URL}/entities`,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
            "id": `urn:ngsi-ld:Statistic:${id}`,
            "type": "Statistic",
            "createdAt": { "value": moment(new Date()).format(dateFormat) },
            "age": { "value": generalInfo.age },
            "nationality": { "value": generalInfo.nationality },
            "country": { "value": generalInfo.country },
            "city": { "value": generalInfo.city },
            "gender": { "value": generalInfo.city },
            "typeAttraction": { "value": newAttraction.typeAttraction },
            "nameAttraction": { "value": newAttraction.name },
            "attendanceDate": { "value": newAttraction.attendanceDate }
        }
    });
};


module.exports = {
    create
}