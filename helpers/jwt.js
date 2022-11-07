
const jwt  = require('jsonwebtoken')
const config = require('../config/config')


const encode = (entity)=>{
    let token = jwt.sign(entity, config.development.jwtSecret, {
        expiresIn:config.development.jwtExpire
    })
    return token
}
const decode = (token)=>{
    let entity = jwt.verify(token, config.development.jwtSecret)
    return entity
}

const verify = (token, entity)=>{
    let entityUncoded = jwt.verify(token, config.development.jwtSecret)
    if(!entityUncoded)return null

    if(entityUncoded.id === entity.id){
        return true
    }else{
        return false
    }
}

module.exports = {
    encode,
    decode,
    verify
}