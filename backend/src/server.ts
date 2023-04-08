import express from 'express';
import dotenv from 'dotenv';
import initDb from './database/db';
import cors from 'cors';
import { getBills } from './api';

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

dotenv.config();

const app = express()
app.use(cors());
const port = process.env.PORT || 3000;

initDb().then((db) => {
    app.get('/api/bills', (req, res) => getBills(req, res, db));

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});