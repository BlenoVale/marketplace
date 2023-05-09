import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { mongoConnect } from './database/mongo';
import apiRoutes from '../src/routes/routes';

dotenv.config();

mongoConnect();

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(fileUpload());

server.use(express.static(__dirname + '/public'));

server.use('/', apiRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Rodando no endereço: ${process.env.BASE}`)
});


