const {check} = require("express-validator");
const {validateResult} = require("../middlewares/validateHelper")

const loginValidate = [
    check("firstname")
        .exists(),
    check("lastname")
        .exists(),
    check("email")
        .exists(),
    check("password")
        .exists(),
            
]


module.exports = {loginValidate}