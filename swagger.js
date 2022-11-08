const options = {

    definition:{
        openapi:"3.0.0",
        info: {
            title: "AlkyBank Wallet",
            version: "1.0.0",
            description:"Una api para el challenge de alkemy"
        },
        servers:[
            {
                url:`http://localhost:3001`
            }
        ],
      
    },
    apis: ["./src/routes/*.js"]
}

module.exports = options