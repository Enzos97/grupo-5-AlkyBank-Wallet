const options = {

    definition:{
        openapi:"3.0.0",
        info: {
            title: "AlkyBank Wallet",
            version: "1.0.0",
            description:"Referencia de la API para la Wallet de AlkyBank"
        },
        servers:[
            {
                url:`http://localhost:3001`,
                description: "Internal Server"
            }
        ],
      
    },
    apis: ["./routes/*.js"]
}

module.exports = options