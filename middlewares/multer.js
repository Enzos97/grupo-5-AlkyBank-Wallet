const multer = require('multer')
const path = require('path')
const {ErrorObject} = require("../helpers/error")


const storage = multer.diskStorage({
    destination:"public/uploads",
    filename:(req,file,cb)=>{
      cb(null,file.originalname)
    }
})

const uploadImage = multer({
    storage,
    dest: path.join(__dirname,"public/uploads"),
    limits:{fileSize:2000000},
    fileFilter:(req,file,cb)=>{
      try {
        const validTypes = ["image/png","image/jpeg","image/svg+xml","image/webp"]
        if(validTypes.includes(file?.mimetype)){
          return cb(null,true)
        }else{
          throw new ErrorObject('Invalid Image.', 400)
        }
      } catch (error) {
        return cb(error,null)
      }
    }
}).single("avatar")
 
module.exports = {uploadImage}