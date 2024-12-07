const CreateNewUser = require("../controllers/create.user.controller");
const express = require("express");
const LoginAccess = require("../controllers/login.user.controller");

const Enrutador = express.Router()

Enrutador.post("/create-user", CreateNewUser)

Enrutador.post("/login", LoginAccess)

module.exports = Enrutador