const jwt =require('jsonwebtoken');
const config = require('../config/config')
const {ErroObject} = require("../helpers/error")
const { User } = require('../database/models')

module.exports={
    auth: (req, res, next) => {
        //comprobar la existencia del token
        if (!req.headers.authorization) {
            res.status(401).json({ msg: 'Access Denied' })
        } else {
            //comprobar la validez de este token
            let token = req.headers.authorization.split(" ")[1]
            jwt.verify(token, config.development.jwtSecret, (err, decoded) => {
                if (err) {
                    res.status(500).json({ msg: 'There was a problem decoding the token', err })
                } else {
                    console.log('user',decoded.type.id)
                    User.findByPk(decoded.type.id).then(user => {
                        req.user = user;
                        next();
                    })
                }
            })
        }
    }
}