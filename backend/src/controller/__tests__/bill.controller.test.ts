import { Request, Response } from 'express';
import { BillsController } from '../bill.controller';
import { AppDataSource } from '../../datasource/sqlite-datasource';
import { Repository } from 'typeorm';
import { BillEntity } from '../../entity/BillEntity';
import { BillDetailsEntity } from '../../entity/BillDetailsEntity';

// Mock the entire AppDataSource
jest.mock('../../datasource/sqlite-datasource', () => ({
    AppDataSource: {
        manager: {
            getRepository: jest.fn()
        }
    }
}));

// Mock the API functions
jest.mock('../../api/bill.api', () => ({
    fetchBillDetails: jest.fn(),
    getBills: jest.fn()
}));

describe('BillsController', () => {
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
        (AppDataSource.manager.getRepository as jest.Mock)
            .mockReturnValueOnce(mockRepository) // For BillEntity
            .mockReturnValueOnce(mockRepository); // For BillDetailsEntity
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getBillDetails', () => {
        it('should return 400 when congress parameter is missing', async () => {
            mockRequest = {
                params: { billType: 'hr', billNumber: '123' }
            };

            await BillsController.getBillDetails(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Missing required parameters: congress, billType, billNumber'
            });
        });

        it('should return 400 when billType parameter is missing', async () => {
            mockRequest = {
                params: { congress: '117', billNumber: '123' }
            };

            await BillsController.getBillDetails(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Missing required parameters: congress, billType, billNumber'
            });
        });

        it('should return 400 when billNumber parameter is missing', async () => {
            mockRequest = {
                params: { congress: '117', billType: 'hr' }
            };

            await BillsController.getBillDetails(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Missing required parameters: congress, billType, billNumber'
            });
        });

        it('should return 400 when congress is not a valid number', async () => {
            mockRequest = {
                params: { congress: 'abc', billType: 'hr', billNumber: '123' }
            };

            await BillsController.getBillDetails(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Congress must be a valid number'
            });
        });
    });

    describe('getBillSummary', () => {
        it('should return 400 when congress parameter is missing', async () => {
            mockRequest = {
                params: { billType: 'hr', billNumber: '123' }
            };

            await BillsController.getBillSummary(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Missing required parameters: congress, billType, billNumber'
            });
        });

        it('should return 400 when API key is not configured', async () => {
            // Temporarily remove API key from environment
            const originalEnv = process.env.API_DATA_GOV;
            delete process.env.API_DATA_GOV;

            mockRequest = {
                params: { congress: '117', billType: 'hr', billNumber: '123' }
            };

            await BillsController.getBillSummary(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'API key not configured'
            });

            // Restore original environment
            process.env.API_DATA_GOV = originalEnv;
        });
    });
});
