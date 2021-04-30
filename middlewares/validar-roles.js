const {request, response, json} = require ('express');
const Usuario = require ('../models/user'); 
const atob = require ('atob');

//Creacion de la funcion roles, para validar si el usuario es administrador o cliente
const roles = async (req = request, res = response, next) => {
    //Se crea una variable token que almacenara el token generado al momento de logearse
    let token = req.header('x-token');
    //En la variable token en la posicion 1, se guardara el id del usuario en la base de datos
    token = JSON.parse(atob(token.split(".")[1]));
    //Se busca el usuario por su id, y se comprueba su existencia
    const usuario = await Usuario.findById(token.uid);
    if(!usuario){
        return res.status(401).json({
            msg: 'Usuario no existe',
        })
    }
    try{
        //Se comprueba de que el usuario no este en el metodo get
        //El cliente solo podra usar el metodo get, el resto solo podra ser usado por el administrador
        req.rol = usuario.rol;
        if(req.method !== "GET"){
            //En caso de no ser Admin, se le mostrara el mensaje de que no es administrador y que no podra realizar actualizaciones en la base de datos
            if(usuario.rol !== "Admin_rol"){
                return res.status(403).json({
                    msg: 'Usuario no administrador',
                });
            }else{
                next();
            }
        }else{
            next();
        }
    }catch(e){
        console.log(e);
        return res.status(401).json({
            msg: 'Token no valido',
        });
    }
}

module.exports = {
    roles,
}