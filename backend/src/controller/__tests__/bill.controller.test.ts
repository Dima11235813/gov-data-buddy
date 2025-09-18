import { Request, Response } from 'express';

// Mock the API functions before importing the controller
const mockFetchBillDetails = jest.fn();
const mockGetBills = jest.fn();

jest.mock('../../api/bill.api', () => ({
    fetchBillDetails: mockFetchBillDetails,
    getBills: mockGetBills
}));

// Mock the datasource
jest.mock('../../datasource/sqlite-datasource', () => ({
    AppDataSource: {
        manager: {
            getRepository: jest.fn(() => ({
                findBy: jest.fn().mockResolvedValue([]),
                findOneBy: jest.fn().mockResolvedValue(null),
                save: jest.fn().mockResolvedValue({}),
                findOne: jest.fn().mockResolvedValue(null),
                createQueryBuilder: jest.fn(() => ({
                    andWhere: jest.fn().mockReturnThis(),
                    getCount: jest.fn().mockResolvedValue(0)
                }))
            }))
        }
    }
}));

import { BillsController } from '../bill.controller';

describe('BillsController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockJson: jest.Mock;
    let mockStatus: jest.Mock;

    beforeEach(() => {
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnThis();
        mockResponse = {
            json: mockJson,
            status: mockStatus
        };
        // Clear mocks
        mockFetchBillDetails.mockClear();
        mockGetBills.mockClear();
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
            expect(mockFetchBillDetails).not.toHaveBeenCalled();
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
            expect(mockFetchBillDetails).not.toHaveBeenCalled();
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
            expect(mockFetchBillDetails).not.toHaveBeenCalled();
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
            expect(mockFetchBillDetails).not.toHaveBeenCalled();
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
