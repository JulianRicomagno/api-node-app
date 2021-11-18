const { AuthService , EmailService, CrudService} = require('../services');
const bcryptjs = require('bcryptjs');
const { generateJwt, ERROR } = require('../helpers')
const Util = require('../util/utils');
const USER_DEVICE_ADMIN = process.env.DEVICE_ADMIN;
const generator = require('generate-password');

const login = async (req, res, next) => {
    try {
        const {
            email,
            passwd,
            device
        } = req.body;
  
        let user = "";
        if (USER_DEVICE_ADMIN === device) {
            user = await AuthService.checkAttribute("UserMunicipality", email, "email");
        } else {
            user = await AuthService.checkAttribute("UserTourist", email, "email");
        }
        
        if (!user) {
            return res.status(400).json({
                msg: ERROR.INVALID_USER_PASS,
                status: 400
            })
        }
        if (user.isDeleted) {
            return res.status(400).json({
                msg: ERROR.USER_INACTVE,
                status: 400
            })
        }
        const validatePasswd = bcryptjs.compareSync(passwd, user.passwd);
        if (!validatePasswd) {
            return res.status(400).json({
                msg: ERROR.INVALID_USER_PASS,
                status: 400
            })
        }
        const token = await generateJwt(user.id);
        user = Util.cleanKeys(user, "passwd");
        res.send({
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            msg: ERROR.ERROR_LOGIN
        })
    }
}


const passRecovery = async (req, res, next) => {
    try {
        const { email, device } = req.body;
        let user = "";

        if (!email) {
            return res.status(400).json({
                msg: "No ingreso un email",
                status: 400
            })
        }

        if (USER_DEVICE_ADMIN === device) {
            user = await AuthService.checkAttribute("UserMunicipality", email, "email");
        } else {
            user = await AuthService.checkAttribute("UserTourist", email, "email");
        }
        
        if (!user) {
            return res.status(400).json({
                msg: "No se encuentra usuario registrado con ese email",
                status: 400
            })
        }

        const passwd = generator.generate({
            length: 6,
            numbers: true
        });

        const salt = bcryptjs.genSaltSync(10);
        const passwdHash = bcryptjs.hashSync(passwd, salt);
        const entity = { ...user, "passwd": passwdHash };
        const isUpdate = await CrudService.update(entity);
        const response = await EmailService.send(user.email, user.userName, passwd);

        if (response && isUpdate.status == 204) {
            res.status(200).json({
                msg: "Se envió un email a la casilla con su nueva password"
            })
        }
    } catch (error) {
            res.status(400).json({
                msg: "Algo salió mal, no se puedo enviar el email"
            })
    }





}


module.exports = {
    login,
    passRecovery
}