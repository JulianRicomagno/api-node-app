const { AuthService } = require('../services');
const { CrudService } = require('../services');
const { UserTouristService } = require('../services');
const { StatisticService } = require('../services');
const bcryptjs = require('bcryptjs');
const { ERROR } = require('../helpers');
const salt = bcryptjs.genSaltSync(10);
const Utils = require('../util/utils');

const create = async (req, res, next) => {
    try {
        const { userName,
            passwd,
            email } = req.body;

        const userEmailVerify = await AuthService.checkAttribute("UserTourist", email, "email");
        const userNameVerify = await AuthService.checkAttribute("UserTourist" ,userName, "userName");
      
        if (userNameVerify || userEmailVerify) {
            return res.status(400).json({
                msg: ERROR.ERROR_SIGNUP
            })
        }
      const passwdHash = bcryptjs.hashSync(passwd, salt);
      const response = await UserTouristService.create(req.body, passwdHash);

        if (response) {
            res.json({ 'msg' : 'ok'});
        }
    } catch (err) {
        next(err);
    }
};

const fetchAll = async (req, res, next) => {
    try {
        const response = await CrudService.fetchAll("UserTourist");
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
        const response = await CrudService.update(req.body);      
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

const updateItinerary = async (req, res, next) => {
    try {
        const { newAttraction, generalInfo } = req.body;
        const responseStatistic = await StatisticService.create(newAttraction, generalInfo);
        dataClean = Utils.cleanKeys(entity,["generalInfo","newAttraction"]);
        const response = await CrudService.update(dataClean);      
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
    update,
    updateItinerary
};