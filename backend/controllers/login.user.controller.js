const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const dotenv = require("dotenv")

dotenv.configDotenv()

const SECRET_KEY = process.env.SECRET_KEY;

const LoginAccess = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por email
    const user = await UserModel.findOne({ email });

    // Validar si el usuario existe
    if (!user) {
      return res.status(400).json({
        msj: "Usuario o contraseña incorrectos",
      });
    }

    // Validar si la contraseña es correcta
    if (user.password !== password) {
      return res.status(400).json({
        msj: "Usuario o contraseña incorrectos",
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
      user: { id: user._id, email: user.email, name: user.name },
      token,
    });
  } catch (error) {
    res.status(500).json({
      msj: "Problema de servidor",
      error: error.message,
    });
  }
};

module.exports = LoginAccess;
