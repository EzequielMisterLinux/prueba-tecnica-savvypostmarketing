const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../models/user.model");

dotenv.config();


const SECRET_KEY = "JIFJSLKFISJFSKMFLAASSS";

const LoginAccess = async (req, res) => {

    console.log('Request body:', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            msj: "Correo electrónico y contraseña son requeridos"
        });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msj: "Usuario o contraseña incorrectos"
            });
        }

        if (user.password !== password) {
            return res.status(400).json({
                msj: "Usuario o contraseña incorrectos"
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            SECRET_KEY, 
            { expiresIn: "2h" } 
        );


        res.status(200).json({
            msj: "Inicio de sesión exitoso",
            user: { 
                id: user._id, 
                email: user.email, 
                name: user.name 
            },
            token,
        });

    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({
            msj: "Problema de servidor",
            error: error.message,
        });
    }
};

module.exports = LoginAccess;