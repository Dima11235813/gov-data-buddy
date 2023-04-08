import dotenv from 'dotenv';
import express from 'express';
import { Router } from 'express';
import "reflect-metadata";
// import initDb from './database/db';

import cors from 'cors';
import { getBills } from './api';
import { AppDataSource } from "./datasource/sqlite-datasource";
import { Bill } from './entities/Bill';
import { BillsController } from './controllers/bill.controller';

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

dotenv.config();

const app = express()
app.use(cors());
const port = process.env.PORT || 3000;

const router = Router();

AppDataSource.initialize()
    .then(async () => {
        console.log('Connected to the database, setting up routes...');

        router.get('/bill', BillsController.getBillsByQuery)
        router.get('/bill/:congress/:billType/:billNumber', BillsController.getBillDetails);
        router.get('/bill/:congress/:billType/:billNumber/summaries', BillsController.getBillSummary);
        app.use('/', router)
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => console.log('TypeORM connection error: ', error));