const UserService = require('../services/userTourist');
const bcryptjs = require('bcryptjs');
const  { generateJwt, ERROR } = require('../helpers')

const login = async (req, res, next) => {
    try {
        const {
            email,
            passwd
        } = req.body;
        
        const user = await UserService.checkEmail(email);
        if (!user) {
            return res.status(400).json({
                msg: ERROR.INVALID_USER_PASS,
                status: 400
            })
        }
        if (user.deleted) {
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