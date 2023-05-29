import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import { mongoConnect } from './database/mongo';
import apiRoutes from '../src/routes/routes';

dotenv.config();
mongoConnect();

const server = express();
server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/', apiRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Rodando no endereço: ${process.env.BASE}`)
});


