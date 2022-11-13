const {ErrorObject} = require("../helpers/error")
const {decode} = require("../helpers/jwt")
const { User } = require('../database/models')

module.exports={
    auth : async (req,res,next)=>{
        let token = req.headers.authorization.split(" ")[1]
        if(!token)throw new ErrorObject('No token', 400)
        let userToken = decode(token)
        let user = await User.findOne({ where: { id:userToken.user.id } })
        if(user){
            req.user = user
            next()
        }else{
            throw new ErrorObject('Invalid token', 403)
        }
    }
}

