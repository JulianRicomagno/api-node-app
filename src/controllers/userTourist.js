const AuthService = require('../services/auth');
const User = require('../models/userTourist');
const bcryptjs = require('bcryptjs');
const { ERROR } = require('../helpers')

const addUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      passwd
    } = req.body;
    const userEmail = await AuthService.checkEmail(email);
    const userName = await User.findOne({
      name: name
    });

    if (userName !== null || userEmail) {
      return res.status(400).json({
        msg: ERROR.ERROR_SIGNUP
      })
    }

    const user = new User({
      name,
      email,
      passwd
    });

    const salt = bcryptjs.genSaltSync(10);
    user.passwd = bcryptjs.hashSync(passwd, salt);

    AuthService.addUser(user);
    res.status(201).json({
      msg: "Success"
    })
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addUser
};