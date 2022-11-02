const { validationResult} = require("express-validator");

const {ErrorObject} = require("../helpers/error")

const validateResult = (req,res,next)=>{
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(403).send(new ErrorObject({errors : error.array()}, 403))
    }
}


module.exports = {validateResult}