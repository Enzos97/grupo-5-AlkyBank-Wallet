const {ErroObject} = require("../helpers/error")
const {verify} = require("../helpers/jwt")
const { User } = require('../database/models')

module.exports={
    authUser : async (req,res,next)=>{
        let token = req.headers.authorization.split(" ")[1]
        console.log(1,token)
        if(!token) throw new ErroObject('access denied', 401)
        let result = verify(token, req.body)
        let user = await User.findOne({ where: { email:req.body.email } })
        if(result){
            console.log(2)
            req.user = user
            next()
        }else{
            throw new ErroObject('access denied', 401)
        }
    }
}
