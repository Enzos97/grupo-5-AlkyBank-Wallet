const { ErrorObject } = require('../helpers/error')

module.exports = {
    isOwnership : (req,res,next)=>{
        //comprobar la existencia del token
        if( parseInt(req.query.id)===req.user.id || req.user.roleId===1){
            next()
        }else{
            throw new ErrorObject('access denied',403)
        } 
    }
}
