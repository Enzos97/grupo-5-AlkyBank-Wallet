const {ErroObject} = require("../helpers/error")
const {verify, decode} = require("../helpers/jwt")
const { User } = require('../database/models')
const { INTEGER } = require("sequelize")

module.exports={
    auth : async (req,res,next)=>{
        let token = req.headers.authorization.split(" ")[1]
        if(!token)throw new ErroObject('No token', 400)
        let userToken = decode(token)
        let user = await User.findOne({ where: { id:userToken.user.id } })
        if(user){
            req.user = user
            next()
        }else{
            throw new ErroObject('Invalid token', 403)
        }
    }
}

