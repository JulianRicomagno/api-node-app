const axios = require('axios');
const moment = require('moment');
const FIWARE_URL = process.env.FIWARE_URL;
const dateFormat = "YYYY-MM-DD";
const mongoose = require('mongoose');

const create = async (user, passwdHash) => {

    const id = new mongoose.Types.ObjectId();
    return await axios({
        url: `${FIWARE_URL}/entities`,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
        "id": `urn:ngsi-ld:UserTourist:${id}`,
        "type": "UserTourist",
        "createdAt": { "value": moment(new Date()).format(dateFormat) },
        "updatedAt": { "value": moment(new Date()).format(dateFormat) },
        "isDeleted": "false",
        "userName": { "value": user.userName },
        "email": { "value": user.email },
        "passwd": { "value": passwdHash },
        "generalInfo": {
            "value": {
                "name": user.name,
                "lastName": user.lastName,
                "age": user.age,
                "nationality": user.nationality,
                "country": user.country,
                "city": user.city,
                "gender": user.gender
                }
            },
        "itinerary": {
            "value": {
                "hotel": "",
                "dayFrom": "",
                "dayTo": "",
                "totalDays": [{
                    "attendanceDate": "",
                    "isDayOff": false,
                    "attractions": [{
                        "id": ""
                    }]
                }]
            }    
        }
        }
    });
};

module.exports = {
    create,
}