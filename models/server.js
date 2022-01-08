

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            user: '/api/usuarios',
            hospital: '/api/hospitales',
            medic: '/api/medicos',
            search: '/api/todo',
            upload: '/api/subir',
        }

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

        this.app.use(this.paths.user, require('../routers/user.routers'));
        this.app.use(this.paths.auth, require('../routers/auth.routers'));
        this.app.use(this.paths.hospital, require('../routers/hospital.routers'));
        this.app.use(this.paths.medic, require('../routers/medic.routers'));
        this.app.use(this.paths.search, require('../routers/search.routers'));
        this.app.use(this.paths.upload, require('../routers/upload.routers'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`servidor corriendo en puerto`, this.port);
        });
    }

}

module.exports = Server;