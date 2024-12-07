const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../models/user.model");

// Configurar dotenv
dotenv.config();

// Verificar que la clave secreta exista
if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY no está definida en las variables de entorno");
}

const SECRET_KEY = process.env.SECRET_KEY;

const LoginAccess = async (req, res) => {
    // Log para depuración
    console.log('Request body:', req.body);

    // Extraer credenciales
    const { email, password } = req.body;

    // Validaciones iniciales
    if (!email || !password) {
        return res.status(400).json({
            msj: "Correo electrónico y contraseña son requeridos"
        });
    }

    try {
        // Buscar el usuario por email
        const user = await UserModel.findOne({ email });

        // Validar si el usuario existe
        if (!user) {
            return res.status(400).json({
                msj: "Usuario o contraseña incorrectos"
            });
        }

        // Validar contraseña (comparación directa)
        if (user.password !== password) {
            return res.status(400).json({
                msj: "Usuario o contraseña incorrectos"
            });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Datos en el token
            SECRET_KEY, // Clave secreta
            { expiresIn: "2h" } // Expiración
        );

        // Responder con el token y el usuario
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