const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    correo:{
        type: String,
        required: [true, 'El correo es requerido'],
        unique:true,
    },
    password:{
        type: String,
    },
    rol:{
        type: String,
        required: [true, 'El rol es requerido'],
        default: 'Cliente_rol',
        enum: ['Admin_rol','Cliente_rol'],
    },
    estado:{
        type: Boolean,
        default:true,
    },
});

module.exports = model('Usuario',usuarioSchema);