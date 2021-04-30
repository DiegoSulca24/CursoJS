const express = require('express');
const cors = require('cors');
const { dbConectar } = require('../database/config.js')


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/usuarios';
        this.authPath = '/auth';
        this.categoriasPath = '/categorias';
        this.productoPath = '/productos';

        this.dbConexion();
            // Middlewares
        this.middlewares();
        // Rutas
        this.routes();
    }

    async dbConexion(){
        await dbConectar();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        //Permite realizar un encoded al traer la data en type text
        this.app.use(express.urlencoded({ extended: true }));

        // Permitir que el body obtenga desde json
        this.app.use(express.json());

        // Servir carpeta publica
        // this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/user'));
        this.app.use(this.categoriasPath, require('../routes/categorias'));
        this.app.use(this.productoPath, require('../routes/productos'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;