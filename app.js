require('dotenv').config();
const Server = require('./src/helpers/server')

const server = new Server();
server.listen();