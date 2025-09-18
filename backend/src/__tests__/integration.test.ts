import request from 'supertest';
import express from 'express';
import { BillsController } from '../controller/bill.controller';
import { CommitteesController } from '../controller/committee.controller';

// Create a test app
const app = express();
app.use(express.json());

// Mock the data source to prevent real database access
jest.mock('../datasource/sqlite-datasource', () => ({
    AppDataSource: {
        manager: {
            getRepository: jest.fn(() => ({
                findBy: jest.fn().mockResolvedValue([]),
                findOneBy: jest.fn().mockResolvedValue(null),
                save: jest.fn(),
                createQueryBuilder: jest.fn(() => ({
                    andWhere: jest.fn().mockReturnThis(),
                    getCount: jest.fn().mockResolvedValue(0)
                }))
            }))
        }
    }
}));

// Mock axios to prevent real API calls
jest.mock('axios');
import axios from 'axios';
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the bill API
jest.mock('../api/bill.api', () => ({
    fetchBillDetails: jest.fn().mockResolvedValue({ id: 1, title: 'Test Bill' }),
    getBills: jest.fn().mockImplementation((req: any, res: any) => {
        res.json({ bills: [] });
    })
}));

// Mock the committee API
jest.mock('../api/committee.api', () => ({
    getCommittees: jest.fn().mockImplementation((req: any, res: any) => {
        res.json({ committees: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } });
    }),
    fetchCommitteeDetails: jest.fn().mockResolvedValue({ id: 1, name: 'Test Committee' }),
    getCommitteeBills: jest.fn().mockImplementation((req: any, res: any) => {
        res.json({ bills: [] });
    }),
    getCommitteeReports: jest.fn().mockImplementation((req: any, res: any) => {
        res.json({ reports: [] });
    })
}));

// Setup routes
app.get('/bill', BillsController.getBillsByQuery);
app.get('/bill/:congress/:billType/:billNumber', BillsController.getBillDetails);
app.get('/bill/:congress/:billType/:billNumber/summaries', BillsController.getBillSummary);
app.get('/committee', CommitteesController.getCommitteesByQuery);
app.get('/committee/:chamber/:committeeCode', CommitteesController.getCommitteeDetails);
app.get('/committee/:chamber/:committeeCode/bills', CommitteesController.getCommitteeBills);
app.get('/committee/:chamber/:committeeCode/reports', CommitteesController.getCommitteeReports);
app.get('/committee/:chamber/:committeeCode/house-communication', CommitteesController.getCommitteeCommunications);
app.get('/committee/senate/:committeeCode/nominations', CommitteesController.getCommitteeNominations);

describe('API Integration Tests', () => {
    describe('Bill Endpoints', () => {
        it('should return 400 for missing congress parameter in bill details', async () => {
            const response = await request(app)
                .get('/bill/hr/123')
                .expect(400);

            expect(response.body.message).toContain('Missing required parameters');
        });

        it('should return 400 for missing billType parameter in bill details', async () => {
            const response = await request(app)
                .get('/bill/117/123')
                .expect(400);

            expect(response.body.message).toContain('Missing required parameters');
        });

        it('should return 400 for invalid congress number', async () => {
            const response = await request(app)
                .get('/bill/abc/hr/123')
                .expect(400);

            expect(response.body.message).toContain('Congress must be a valid number');
        });
    });

    describe('Committee Endpoints', () => {
        it('should return 400 for missing committeeCode parameter', async () => {
            const response = await request(app)
                .get('/committee/house')
                .expect(400);

            expect(response.body.message).toContain('Missing required parameter: committeeCode');
        });

        it('should return 400 for missing chamber parameter in committee bills', async () => {
            const response = await request(app)
                .get('/committee/hspw00/bills')
                .expect(400);

            expect(response.body.message).toContain('Missing required parameters: chamber, committeeCode');
        });

        it('should return 400 for missing committeeCode parameter in committee bills', async () => {
            const response = await request(app)
                .get('/committee/house/bills')
                .expect(400);

            expect(response.body.message).toContain('Missing required parameters: chamber, committeeCode');
        });

        it('should return committees list successfully', async () => {
            const response = await request(app)
                .get('/committee?limit=10&offset=0')
                .expect(200);

            expect(response.body).toHaveProperty('committees');
            expect(response.body).toHaveProperty('pagination');
            expect(Array.isArray(response.body.committees)).toBe(true);
        });
    });

    describe('Pagination Support', () => {
        it('should handle pagination parameters for committees', async () => {
            const response = await request(app)
                .get('/committee?limit=5&offset=0&chamber=house')
                .expect(200);

            expect(response.body).toHaveProperty('pagination');
            expect(response.body.pagination).toHaveProperty('page');
            expect(response.body.pagination).toHaveProperty('limit');
            expect(response.body.pagination).toHaveProperty('total');
            expect(response.body.pagination).toHaveProperty('totalPages');
        });
    });
});
