const user = require('../models/userTourist');
const UserModel = require('../models/userTourist');

const checkEmail = (email) => {
  return UserModel.findOne({
    'email' : email
  }).exec();
}

const addUser = (user) => {
  user.save();
};

module.exports = {
  checkEmail,
  addUser
};