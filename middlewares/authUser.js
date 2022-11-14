const { ErrorObject } = require("../helpers/error")
const { decode } = require("../helpers/jwt")
const { User } = require('../database/models')
const createHttpError = require('http-errors')
module.exports = {
    auth: async (req, res, next) => {
       
        try {
            const { authorization } = req.headers
            if (!authorization) throw new ErrorObject('Error no existe el token', 500)
            let token = authorization.split(" ")[1]
            if (!token) throw new ErrorObject('No token', 400)
            let userToken = decode(token)
            let user = await User.findOne({ where: { id: userToken.user.id } })
            if (user) {
                req.user = user
                next()
            } else {
                throw new ErrorObject('Invalid token', 403)
            }
            console.log('try', authorization)
        } catch (error) {
        
            const httpError = createHttpError(
                error.statusCode,
                `[Error Validating Token ] - [TOKEN]: ${error.message}`,
            )
          
            next(httpError)
        
        }
        
    }
}




    

