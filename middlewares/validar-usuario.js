const {request, response} = require ('express');
const Usuario = require ('../models/user'); 

//Esta funcion hara que el rol del usuario se imprima al momento de logearse

const validarROL = async (req = request, res = response, next) => {
    //Se busca el usuario por medio de su correo
    let {correo} = req.body;
    const usuario = await Usuario.findOne({correo});
    //Se comprueba la existencia del usuario
    if(!usuario){
        return res.status(401).json({
            msg:'No existe el usuario',
        });
    }
    try{
        //Si existe el usuario se imprimira su rol
        req.rol = usuario.rol;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            msg: 'Rol no valido',
        });
    }
}

module.exports = {
    validarROL,
}