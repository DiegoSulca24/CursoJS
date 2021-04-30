const { response, request } = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const atob = require ('atob');


const usuariosGet = async (req = request, res = response) => {
    const rol = req.rol;
    //En caso de ser admin se mostraran todos los usuarios
    if(rol === "Admin_rol"){
        const usuarios = await Usuario.find();
        return res.json({
            msg: 'API - GET',
            usuarios,
        });
    }else{
        //En caso de ser cliente, se mostrara solo su perfil
        let token = req.header('x-token');
        token = JSON.parse(atob(token.split(".")[1]));
        const usuarios = await Usuario.findById(token.uid);
        return res.json({
            msg: 'API - GET',
            usuarios,
        });
    }   
}

//Los metodos de creacion, actualizacion y borrar, solo seran permitidos por los administradores
//Eso se realizo en la funcion (roles)

const usuariosPost = async (req = request, res = response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors,
        });
    }
    const { nombre, correo, password, estado } = req.body;

    const usuario = new Usuario({nombre, correo, password, estado});

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt);

    //Validacion de correo
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        return res.status(400).json({
            msg:'Usuario ya existe en la base de datos'
        });
    }

    usuario.save();

    res.json({
        msg: 'API - POST',
        usuario,
    });
}

const usuriosPut = async (req = request, res = response) => {
    const id = req.params.id;
    let {password, ...resto} = req.body;

    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password,salt);

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'API - PUT',
        id,
        usuario,
    });
}
const usuariosDelete = async (req = request, res = response) => {
    const id = req.params.id;

    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    res.json({
        msg: 'API - DELETE',
        usuario,
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuriosPut,
    usuariosDelete
}