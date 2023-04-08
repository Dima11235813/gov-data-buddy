import dotenv from 'dotenv';
import express from 'express';
import "reflect-metadata";
// import initDb from './database/db';

import cors from 'cors';
import { getBills } from './api';
import { AppDataSource } from "./datasource/sqlite-datasource";
import { Bill } from './entities/Bill';

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

dotenv.config();

const app = express()
app.use(cors());
const port = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(async () => {
        console.log('Connected to the database');

        //TODO Once we have many repositories, we should create a repository factory
        const billRepository = AppDataSource.manager.getRepository(Bill);

        app.get('/api/bills', async (req, res) => {
            const cachedBills = await billRepository.findBy({ searchQuery: `${req.query}` });
            console.log(`cachedBills: ${cachedBills.length}`)
            if (cachedBills.length > 0) {
                res.json({ bills: cachedBills });
                return;
            } else {
                getBills(req, res, billRepository);
            }
        });

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => console.log('TypeORM connection error: ', error));