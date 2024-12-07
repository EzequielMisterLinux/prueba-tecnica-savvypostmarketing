const UserModel = require("../models/user.model");

const CreateNewUser = async(req, res) => {

    const {name, email, password} = req.body

    if (!name || !email || !password) {
        return res.status(400).json({
            msj:"todos los campos de la peticion son requeridos"
        })
    }

    if (password.length < 8) {
        return res.status(400).json({
            msj:"la contraseña debe ser mayor a 8 caracteres"
        })
    }

    const IsUserExist = await UserModel.findOne({email})

    if (IsUserExist) {
        return res.status(400).json({
            msj:"El usuario ya existe en la base de datos"
        })
    }


    try {
        
        const NewUser = await UserModel({name, email, password})

        await NewUser.save()

        res.status(201).json({
            msj:"Usuario creado exitosamente",
            user: NewUser
        })


    } catch (error) {
        
        res.status(500).json({
            msj: "No se pudo crear el usuario, problema de servidor",
            error:error
        })

    }

}


module.exports = CreateNewUser