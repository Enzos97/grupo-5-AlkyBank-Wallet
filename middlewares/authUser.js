const {ErroObject} = require("../helpers/error")
const {verify} = require("../helpers/jwt")
const { User } = require('../database/models')

module.exports={
    auth : async (req,res,next)=>{
        let token = req.headers.authorization.split(" ")[1]
        if(!token) throw new ErroObject('access denied', 401)
        let result = verify(token, req.body)
        let user = await User.findOne({ where: { email:req.body.email } })
        if(result){
            req.user = user
            next()
        }else{
            throw new ErroObject('access denied', 401)
        }
    }
}
