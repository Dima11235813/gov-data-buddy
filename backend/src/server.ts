import dotenv from 'dotenv';
import express from 'express';
import { Router } from 'express';
import "reflect-metadata";
// import initDb from './database/db';

import cors from 'cors';
import { BillsController } from './controller/bill.controller';
import { MembersController } from './controller/member.controller';
import { CommitteesController } from './controller/committee.controller';
import { AppDataSource } from './datasource/sqlite-datasource';

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
        //TODO Integrate all into nest framework
        //BILL
        router.get('/bill', BillsController.getBillsByQuery)
        router.get('/bill/:congress/:billType/:billNumber', BillsController.getBillDetails);
        router.get('/bill/:congress/:billType/:billNumber/summaries', BillsController.getBillSummary);
        //MEMBER
        router.get('/member', MembersController.getMembersByQuery);
        //COMMITTEE
        router.get('/committee', CommitteesController.getCommitteesByQuery);
        router.get('/committee/:congress/:chamber', CommitteesController.getCommitteesByQuery);
        router.get('/committee/:chamber', CommitteesController.getCommitteesByQuery);
        router.get('/committee/:chamber/:committeeCode', CommitteesController.getCommitteeDetails);
        router.get('/committee/:congress/:chamber/:committeeCode', CommitteesController.getCommitteeDetails);
        router.get('/committee/:chamber/:committeeCode/bills', CommitteesController.getCommitteeBills);
        router.get('/committee/:chamber/:committeeCode/reports', CommitteesController.getCommitteeReports);
        router.get('/committee/:chamber/:committeeCode/house-communication', CommitteesController.getCommitteeCommunications);
        router.get('/committee/senate/:committeeCode/nominations', CommitteesController.getCommitteeNominations);
        app.use('/', router)
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => console.log('TypeORM connection error: ', error));