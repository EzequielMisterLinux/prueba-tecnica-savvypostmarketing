const express = require('express')
const dotenv = require("dotenv")
const MongoConnection = require('./database/mongo.db')
const cors = require("cors")
const Enrutador = require('./routers/user.routes')

dotenv.configDotenv()
const port = 3000


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

MongoConnection()

app.use("/api", Enrutador)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`server corriendo en http://localhost:${port}`))