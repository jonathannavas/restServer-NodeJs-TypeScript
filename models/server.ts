import express, {Application} from 'express';
import cors from "cors";

import userRoutes from '../routes/usuario';
import db from '../db/conection';

class Server{

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        
        this.app = express();
        this.port = process.env.PORT || '8000';

        //base de datos
        this.dbConnection();
        //middlewares
        this.middlewares();

        //definir las rutas
        this.routes();
    }

    //TODO Conectar Base de Datos
    async dbConnection(){
        try {
            
            await db.authenticate();
            console.log('Base de datos en linea');

        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares(){

        //CORS
        this.app.use( cors() );
        //LECTURA DEL BODY
        this.app.use( express.json() );
        //CARPETA PUBLICA
        this.app.use( express.static('public') );

    }

    routes(){
        this.app.use( this.apiPaths.usuarios, userRoutes );
    }

    listen(){
        this.app.listen( this.port, ()=> {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        });
    }

}

export default Server;
