const axios = require('axios');
const FIWARE_URL = process.env.FIWARE_URL;

const checkAttribute = async (typeEntity, value, attribute) => {
    const response = await axios({
        url: `${FIWARE_URL}/entities/`,
        method: 'get',
        params: {
            type: typeEntity,
            q: `${attribute}==${value}`,
            options: "keyValues",
        }
    });
    return response.data[0];
}

module.exports = {
  checkAttribute,
};