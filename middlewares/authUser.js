const {ErroObject} = require("../helpers/error")
const {verify} = require("../helpers/jwt")
const { User } = require('../database/models')
const { INTEGER } = require("sequelize")

module.exports={
    auth : async (req,res,next)=>{
        let userId = parseInt(req.params.id)
        if(!userId)throw new ErroObject('bad request id', 400)
        let token = req.headers.authorization.split(" ")[1]
        if(!token) throw new ErroObject('access denied', 401)
        let result = verify(token, req.body)
        let user = await User.findOne({ where: { id:userId } })
        if(result){
            req.user = user
            next()
        }else{
            throw new ErroObject('access denied', 401)
        }
    }
}
