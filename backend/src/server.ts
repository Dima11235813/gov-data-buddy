import dotenv from 'dotenv';
import express from 'express';
import { Router } from 'express';
import "reflect-metadata";
// import initDb from './database/db';

import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.config';
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
app.use(express.json()); // Add JSON parsing middleware
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
        router.get('/member/:bioguideId', MembersController.getMemberDetails);
        router.get('/member/congress/:congress', MembersController.getMembersByCongress);
        router.get('/member/:bioguideId/sponsored-legislation', MembersController.getMemberSponsoredLegislation);
        router.get('/member/:bioguideId/cosponsored-legislation', MembersController.getMemberCosponsoredLegislation);

        //MEMBER PICTURES - must come before state routes to avoid conflicts
        router.get('/member/:bioguideId/picture', MembersController.getMemberPicture);
        router.get('/member/:bioguideId/picture/:pictureId', MembersController.getMemberPicture);
        router.post('/member/:bioguideId/picture/refresh', MembersController.refreshMemberPicture);
        router.get('/member/:bioguideId/picture/history', MembersController.getMemberPictureHistory);

        //STATE ROUTES - less specific, so they come after picture routes
        router.get('/member/:stateCode', MembersController.getMembersByState);
        router.get('/member/:stateCode/:district', MembersController.getMembersByStateDistrict);
        router.get('/member/congress/:congress/:stateCode/:district', MembersController.getMembersByCongressStateDistrict);
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

        // Swagger UI
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        app.use('/', router)
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`Swagger UI available at: http://localhost:${port}/api-docs`);
        });
    })
    .catch((error) => console.log('TypeORM connection error: ', error));