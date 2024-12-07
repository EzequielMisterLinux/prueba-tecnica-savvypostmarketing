const express = require('express')
const dotenv = require("dotenv")
const MongoConnection = require('./database/mongo.db')
const cors = require("cors")
const Enrutador = require('./routers/user.routes')

dotenv.configDotenv()
const port = process.env.PORT


const app = express()

app.use(cors())

app.use(express.json())

MongoConnection()

app.use("/api", Enrutador)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`server corriendo en http://localhost:${port}`))