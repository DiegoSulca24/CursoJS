const {request, response} = require ('express');
const bcryptjs = require ('bcryptjs');
const Usuario = require ('../models/user');
const { generarToken } = require('../helper/generar-jwt');

const login = async (req = request, res = response) => {
    const rol = req.rol;
    const {correo, password} = req.body;

    try {

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg:'usuario o contrasena incorrecta (Usuario)'
            });
        }

        // Verificar que el usuario este activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'usuario o contrasena incorrecta (Estado)'
            });
        }

        // Verificar que la contrasena sea correcta
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                msg:'usuario o contrasena incorrecta (Password)'
            });
        }

        // Crear token
        const token = await generarToken(usuario.id);

        // Respuesta

        res.json({
            msg:"Login exitoso",
            token,
            correo,
            password,
            rol,
        });

    }catch (error){
        console.log(error);
        return res.status(500).json({
            msg:'Error, problemas en el servidor, hable con el administrador'
        });
    }  
}

module.exports = {
    login
}