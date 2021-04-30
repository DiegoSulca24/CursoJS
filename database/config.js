const mongoose = require('mongoose');
const dbConectar = async() => {
    try{
        await mongoose.connect('mongodb://localhost:27017/',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        });
        console.log('Conexion a base de datos exitosa');

    }catch (error){
        console.log('No se pudo conectar a la base de datos');
        console.log(error);
    }
    
};

module.exports = {
    dbConectar,
};
