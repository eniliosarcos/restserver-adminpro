

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/usuarios';

        //middlewares
        this.middlewares();
        
        //rutas de mi aplicacion
        this.routes();

        this.dbConnect();
    }

    async dbConnect(){
        dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        // directorio pubico
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.userPath, require('../routers/user.routers'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`servidor corriendo en puerto`, this.port);
        });
    }

}

module.exports = Server;