const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
    },
    estado:{
        type: Boolean,
        default: true,
        require: true,
    },
});

module.exports = model('Categoria',CategoriaSchema);