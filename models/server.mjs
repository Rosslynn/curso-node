import express, { urlencoded } from "express";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import userRoutes from "../routes/user.mjs";
import authRoutes from "../routes/auth.mjs";
import categoriesRoutes from '../routes/categories.mjs';
import productsRoutes from '../routes/products.mjs';
import dbConnection from "../database/config.mjs";

export default class Server {

    constructor() {
        this.app = express();
        this.paths = {
            users:'/api/users',
            authPath:'/api/auth',
            categoriesPath:'/api/categories',
            productsPath:'/api/products',
        }

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
        this.app.use(this.paths.users, userRoutes);
        this.app.use(this.paths.authPath, authRoutes);
        this.app.use(this.paths.categoriesPath, categoriesRoutes);
        this.app.use(this.paths.productsPath, productsRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        })
    }
}