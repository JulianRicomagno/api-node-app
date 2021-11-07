const { UserMunicipalityService } = require('../services');
const { AuthService } = require('../services');
const { CrudService } = require('../services');
const bcryptjs = require('bcryptjs');
const { ERROR } = require('../helpers');
const salt = bcryptjs.genSaltSync(10);

const create = async (req, res, next) => {
    try {
        const { userName,
            passwd,
            email,
            role } = req.body;

        const userEmailVerify = await AuthService.checkAttribute("UserMunicipality",email, "email");
        const userNameVerify = await AuthService.checkAttribute("UserMunicipality",userName, "userName");    
        console.log(userEmailVerify)    
        if (userNameVerify || userEmailVerify) {
            return res.status(400).json({
                msg: ERROR.ERROR_SIGNUP
            })
        }
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
        const response = await CrudService.fetchAll("UserMunicipality");
        res.send(response);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const response = await CrudService.logicDeleteEntity(req.body.id);
        if(response) res.json({ 'delete' : true });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const passwdHash = bcryptjs.hashSync(req.body.passwd, salt);
        const updateData = { ...req.body, "passwd": passwdHash }
        const response = await CrudService.update(updateData);      
        if (response.status == 204) {
            res.status(200).json(
                {
                    "msg": "Update ok"
                }
            )
        }
    } catch (err) {
        res.send(err);
    }
}

module.exports = {
    create,
    fetchAll,
    deleteUser,
    update
}
