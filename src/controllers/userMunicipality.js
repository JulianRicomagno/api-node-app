const { UserMunicipalityService } = require('../services');
const bcryptjs = require('bcryptjs');
const { ERROR } = require('../helpers');

const create = async (req, res, next) => {
    try {
        const { userName,
            passwd,
            email,
            role } = req.body;

        const user = await UserMunicipalityService.checkEmail(email);
        
        if (user.length !== 0) {
            if (user[0].userName !== null || user[0].email !== null) {
            return res.status(400).json({
                msg: ERROR.ERROR_SIGNUP
            })
        }
        }

        const salt = bcryptjs.genSaltSync(10);
        const passwdHash = bcryptjs.hashSync(passwd, salt);
        
        const response = await UserMunicipalityService.create(userName, passwdHash, email, role);
        if (response) {
            res.json({ 'msg' : 'ok'});
        }
    } catch (err) {
        next(err);
    }
};

const fetchAll = async (req, res, next) => {
    try {
        const response = await UserMunicipalityService.fetchAll();
        res.send(response);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    create,
    fetchAll
}
