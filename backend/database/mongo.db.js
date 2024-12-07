const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.configDotenv()

let connectionUrl = process.env.MONGOURL


const MongoConnection = async () => {
    
    try {

        await mongoose.connect(connectionUrl)

        console.log("Conexion exitosa a la base de datos");
        
        
    } catch (error) {
       
        console.error(error);
        
    }

}

module.exports = MongoConnection