const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose  = require('./mongoose');

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;
    this.usersPath = '/api/user';
    this.authPath = '/api/auth';
    this.attractionPath = '/api/attraction';
    this.userMunicipality = '/api/usermunicipality';                              
    this.connectDb();
    this.middlewares();
    this.routes();
  }

  async connectDb() {
    await mongoose.dbConnection();
  }

  middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.authPath, require('../routes/api/auth'));
    this.app.use(this.attractionPath, require('../routes/api/attraction'));
    this.app.use(this.usersPath, require('../routes/api/userTourist'));
    this.app.use(this.userMunicipality, require('../routes/api/userMunicipality'));
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Server run in port ${this.PORT}`);
    });
  }
}

module.exports = Server;