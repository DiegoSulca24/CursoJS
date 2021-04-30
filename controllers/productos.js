const { response, request } = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const atob = require ('atob');
const Producto = require ('../models/producto');


const productoGet = async (req = request, res = response) => {
    const rol = req.rol;
    //En caso de ser admin, se mostraran todos los productos en la base de datos
    if(rol === "Admin_rol"){
        const productos = await Producto.find();
        return res.json({
            msg: 'API - GET',
            productos,
        });
    }else{
        //Si es cliente solo se mostraran los productos, que este ha adquirido
        let token = req.header('x-token');
        token = JSON.parse(atob(token.split(".")[1]));
        const productos = await Producto.find({usuario: token.uid});
        return res.json({
            msg: 'API - GET',
            productos,
        });
    }   
}

//Los metodos de creacion, actualizacion y borrar, solo seran permitidos por los administradores
//Eso se realizo en la funcion (roles)

const productoPost = async (req = request, res = response) => {

    const { nombre, estado, usuario, precio, categoria, descripcion, disponible } = req.body;

    const productos = new Producto({nombre, estado, usuario, precio, categoria, descripcion, disponible});

    productos.save();

    res.json({
        msg: 'API - POST',
        productos,
    });
}

const productoPut = async (req = request, res = response) => {
    const id = req.params.id;
    let { ...resto} = req.body;

    const productos = await Producto.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'API - PUT',
        id,
        productos,
    });
}
const productoDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const productos = await Producto.findByIdAndUpdate(id, {disponible:false, estado:false});
    res.json({
        msg: 'API - DELETE',
        productos,
    });
}

module.exports = {
    productoGet,
    productoPost,
    productoPut,
    productoDelete
}