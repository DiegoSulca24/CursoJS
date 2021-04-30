const { response, request } = require('express');
const Usuario = require('../models/user');
const Categoria = require('../models/categoria');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const atob = require ('atob');


const categoriaGet = async (req = request, res = response) => {
    const rol = req.rol;
    //En caso de ser admin, se imprimiran todas las categorias, si no, no se les mostrara nada
    if(rol === "Admin_rol"){
        const categorias = await Categoria.find();
        return res.json({
            msg: 'API - GET',
            categorias,
        });
    }else{
        return res.status(401).json({
            msg: 'Usuario no administrador',
        });
    }   
}

//Los metodos de creacion, actualizacion y borrar, solo seran permitidos por los administradores
//Eso se realizo en la funcion (roles)

const categoriaPost = async (req = request, res = response) => {
    const { nombre, estado} = req.body;

    const categorias = new Categoria({nombre, estado});

    categorias.save();

    res.json({
        msg: 'API - POST',
        categorias,
    });
}

const categoriaPut = async (req = request, res = response) => {
    const id = req.params.id;
    let {nombre} = req.body;

    const categorias = await Categoria.findByIdAndUpdate(id, {nombre});

    res.json({
        msg: 'API - PUT',
        id,
        categorias,
    });
}
const categoriaDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const categorias = await Categoria.findByIdAndUpdate(id, {estado:false});
    res.json({
        msg: 'API - DELETE',
        categorias,
    });
}

module.exports = {
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete
}