import { Request, Response } from 'express';
import { CommitteesController } from '../committee.controller';
import { AppDataSource } from '../../datasource/sqlite-datasource';

// Mock the entire AppDataSource
jest.mock('../../datasource/sqlite-datasource', () => ({
    AppDataSource: {
        manager: {
            getRepository: jest.fn()
        }
    }
}));

// Mock the API functions
jest.mock('../../api/committee.api', () => ({
    getCommittees: jest.fn(),
    fetchCommitteeDetails: jest.fn(),
    getCommitteeBills: jest.fn(),
    getCommitteeReports: jest.fn()
}));

describe('CommitteesController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockJson: jest.Mock;
    let mockStatus: jest.Mock;
    let mockRepository: any;

    beforeEach(() => {
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnThis();
        mockResponse = {
            json: mockJson,
            status: mockStatus
        };

        // Mock repository
        mockRepository = {
            findBy: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            findOne: jest.fn(),
            createQueryBuilder: jest.fn(() => ({
                andWhere: jest.fn().mockReturnThis(),
                getCount: jest.fn().mockResolvedValue(100)
            }))
        };

        // Setup AppDataSource mock to return our mock repository
        (AppDataSource.manager.getRepository as jest.Mock).mockReturnValue(mockRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getCommitteeDetails', () => {
        it('should return 400 when committeeCode parameter is missing', async () => {
            mockRequest = {
                params: { chamber: 'house' }
            };

            await CommitteesController.getCommitteeDetails(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Missing required parameter: committeeCode'
            });
        });

        it('should return 400 when congress is not a valid number', async () => {
            mockRequest = {
                params: { congress: 'abc', chamber: 'house', committeeCode: 'hspw00' }
            };

            await CommitteesController.getCommitteeDetails(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Congress must be a valid number'
            });
        });
    });

    describe('getCommitteeBills', () => {
        it('should return 400 when chamber parameter is missing', async () => {
            mockRequest = {
                params: { committeeCode: 'hspw00' }
            };

            await CommitteesController.getCommitteeBills(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Missing required parameters: chamber, committeeCode'
            });
        });

        it('should return 400 when committeeCode parameter is missing', async () => {
            mockRequest = {
                params: { chamber: 'house' }
            };

            await CommitteesController.getCommitteeBills(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Missing required parameters: chamber, committeeCode'
            });
        });
    });

    describe('getCommitteeReports', () => {
        it('should return 400 when chamber parameter is missing', async () => {
            mockRequest = {
                params: { committeeCode: 'hspw00' }
            };

            await CommitteesController.getCommitteeReports(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Missing required parameters: chamber, committeeCode'
            });
        });

        it('should return 400 when committeeCode parameter is missing', async () => {
            mockRequest = {
                params: { chamber: 'house' }
            };

            await CommitteesController.getCommitteeReports(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Missing required parameters: chamber, committeeCode'
            });
        });
    });

    describe('getCommitteeCommunications', () => {
        it('should return 400 when chamber parameter is missing', async () => {
            mockRequest = {
                params: { committeeCode: 'hspw00' }
            };

            await CommitteesController.getCommitteeCommunications(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Missing required parameters: chamber, committeeCode'
            });
        });

        it('should return 400 when committeeCode parameter is missing', async () => {
            mockRequest = {
                params: { chamber: 'house' }
            };

            await CommitteesController.getCommitteeCommunications(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Missing required parameters: chamber, committeeCode'
            });
        });

        it('should return 500 when API key is not configured', async () => {
            // Temporarily remove API key from environment
            const originalEnv = process.env.API_DATA_GOV;
            delete process.env.API_DATA_GOV;

            mockRequest = {
                params: { chamber: 'house', committeeCode: 'hspw00' }
            };

            await CommitteesController.getCommitteeCommunications(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'API key not configured'
            });

            // Restore original environment
            process.env.API_DATA_GOV = originalEnv;
        });
    });

    describe('getCommitteeNominations', () => {
        it('should return 400 when committeeCode parameter is missing', async () => {
            mockRequest = {
                params: {}
            };

            await CommitteesController.getCommitteeNominations(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Missing required parameter: committeeCode'
            });
        });

        it('should return 500 when API key is not configured', async () => {
            // Temporarily remove API key from environment
            const originalEnv = process.env.API_DATA_GOV;
            delete process.env.API_DATA_GOV;

            mockRequest = {
                params: { committeeCode: 'ssas00' }
            };

            await CommitteesController.getCommitteeNominations(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'API key not configured'
            });

            // Restore original environment
            process.env.API_DATA_GOV = originalEnv;
        });
    });
});
