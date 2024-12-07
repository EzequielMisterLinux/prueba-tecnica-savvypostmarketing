const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.configDotenv()

let connectionUrl = "mongodb+srv://ezequielcampos:Vv1bbyDGL9h0bowT@cluster0.06meydb.mongodb.net/pruebaTecnicaFerre?retryWrites=true&w=majority&appName=Cluster0"



const MongoConnection = async () => {
    
    try {

        await mongoose.connect(connectionUrl)

        console.log("Conexion exitosa a la base de datos");
        
        
    } catch (error) {
       
        console.error(error);
        
    }

}

module.exports = MongoConnection