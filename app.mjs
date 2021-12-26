import express from "express";
import dotenv from 'dotenv';

import Server from './models/server.mjs';

dotenv.config();

const server = new Server();
server.listen();


