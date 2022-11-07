
const jwt  = require('jsonwebtoken')
const config = require('../config/config')

// entity:user{}
const encode = (entity)=>{
    let token = jwt.sign(entity, config.jwSecret, {
        expiresIn:"1h"
    })
    return token
}
const decode = (token)=>{
    let entity = jwt.verify(token, config.jwSecret)
    return entity
}
// token:token, entity:user{}
const verify = (token, entity)=>{
    let entityUncoded = jwt.verify(token, config.jwSecret)
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