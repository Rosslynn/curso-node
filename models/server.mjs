import express, { urlencoded } from "express";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import userRoutes from "../routes/user.mjs";
import authRoutes from "../routes/auth.mjs";
import dbConnection from "../database/config.mjs";

export default class Server {

    constructor() {
        this.app = express();
        this.path = '/api/users';
        this.authPath = '/api/auth';
        this.port = process.env.PORT || 8080;

        //Conectar db
        this.databaseConnection();

        // Middlewares
        this.middlewares();

        //rutas
        this.routes();
    }

    middlewares() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname,'../public')))
    }

    async databaseConnection(){
        await dbConnection();
    }

    routes() {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.path, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        })
    }
}