const { UserMunicipalityService } = require('../services');
const bcryptjs = require('bcryptjs');
const  { generateJwt, ERROR } = require('../helpers')
const USER_DEVICE_ADMIN = process.env.DEVICE_ADMIN;

const login = async (req, res, next) => {
    try {
        const {
            email,
            passwd,
            device
        } = req.body;

        if (USER_DEVICE_ADMIN === device) {
            user = await UserMunicipalityService.checkAttribute(email, "email");
         } 
        //     // user = await UserService.checkEmail(email);
        // }

        console.log(user)
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
                status: 400
            })
        }

        const token = await generateJwt(user._id);

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

module.exports = {
    login
}