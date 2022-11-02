const { check } = require('express-validator');

const {validateResult} = require("../middlewares/validateHelper")

const createUserValidator = [
    check("firstname")
        .exists()
        .withMessage("Firstname required"),
    check("lastname")
        .exists()
        .withMessage("Firstname required"),
    check("email")
        .exists()
        .withMessage("Firstname required")
        .isEmail(),
    check("password","Passsword required")
        .exists()
        .isLength({min:5})
        .withMessage("Password muyst be +5 chars long"),
    (req,res,next) =>{
            validateResult(req,res,next)
        }       
    ]


module.exports = {createUserValidator};