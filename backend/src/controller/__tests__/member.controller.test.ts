import { Request, Response } from 'express';
import { MembersController } from '../member.controller';
import { AppDataSource } from '../../datasource/sqlite-datasource';
import { Member } from '../../entity/MemberEntity';

// Mock the dependencies
jest.mock('../../datasource/sqlite-datasource');
jest.mock('../../api/member.api');

describe('MembersController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseObject: any;

    beforeEach(() => {
        responseObject = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        mockResponse = responseObject;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getMembersByQuery', () => {
        it('should handle basic member query', async () => {
            mockRequest = {
                query: {
                    format: 'json',
                    offset: '0',
                    limit: '10',
                    fromDateTime: '2023-01-01T00:00:00Z',
                    toDateTime: '2023-12-31T23:59:59Z'
                }
            };

            // Mock repository
            const mockRepository = {
                findBy: jest.fn().mockResolvedValue([]),
                save: jest.fn(),
            };

            // Mock AppDataSource
            (AppDataSource.manager.getRepository as jest.Mock).mockReturnValue(mockRepository);

            await MembersController.getMembersByQuery(mockRequest as Request, mockResponse as Response);

            // Should attempt to call the API since no cached data
            expect(mockResponse.status).not.toHaveBeenCalledWith(500);
        });

        it('should return cached members when available', async () => {
            mockRequest = {
                query: {
                    format: 'json',
                    offset: '0',
                    limit: '10'
                }
            };

            const mockMembers = [
                { id: 1, name: 'John Doe', bioguideId: 'D0001' },
                { id: 2, name: 'Jane Smith', bioguideId: 'R0002' }
            ];

            const mockRepository = {
                findBy: jest.fn().mockResolvedValue(mockMembers),
                save: jest.fn(),
            };

            (AppDataSource.manager.getRepository as jest.Mock).mockReturnValue(mockRepository);

            await MembersController.getMembersByQuery(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.json).toHaveBeenCalledWith({ members: mockMembers });
        });
    });

    describe('getMemberDetails', () => {
        it('should handle member details request', async () => {
            mockRequest = {
                params: { bioguideId: 'D0001' },
                query: { format: 'json' }
            };

            const mockRepository = {
                findOneBy: jest.fn().mockResolvedValue(null), // No cached member
                save: jest.fn(),
            };

            (AppDataSource.manager.getRepository as jest.Mock).mockReturnValue(mockRepository);

            await MembersController.getMemberDetails(mockRequest as Request, mockResponse as Response);

            // Should attempt to fetch from API since no cached data
            expect(mockResponse.status).toHaveBeenCalledWith(500); // API call will fail in test
        });

        it('should return cached member when available', async () => {
            mockRequest = {
                params: { bioguideId: 'D0001' }
            };

            const mockMember = {
                id: 1,
                name: 'John Doe',
                bioguideId: 'D0001',
                party: 'D',
                state: 'CA'
            };

            const mockRepository = {
                findOneBy: jest.fn().mockResolvedValue(mockMember),
                save: jest.fn(),
            };

            (AppDataSource.manager.getRepository as jest.Mock).mockReturnValue(mockRepository);

            await MembersController.getMemberDetails(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.json).toHaveBeenCalledWith({ member: mockMember });
        });

        it('should handle member not found', async () => {
            mockRequest = {
                params: { bioguideId: 'INVALID' }
            };

            const mockRepository = {
                findOneBy: jest.fn().mockResolvedValue(null),
                save: jest.fn(),
            };

            (AppDataSource.manager.getRepository as jest.Mock).mockReturnValue(mockRepository);

            await MembersController.getMemberDetails(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
        });

        it('should handle database errors gracefully', async () => {
            mockRequest = {
                params: { bioguideId: 'D0001' }
            };

            const mockRepository = {
                findOneBy: jest.fn().mockRejectedValue(new Error('Database connection failed')),
                save: jest.fn(),
            };

            (AppDataSource.manager.getRepository as jest.Mock).mockReturnValue(mockRepository);

            await MembersController.getMemberDetails(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'An error occurred while fetching member data.',
                error: 'Database connection failed'
            });
        });
    });

    describe('getMembersByQuery', () => {
        beforeEach(() => {
            mockRequest = {
                query: {}
            };
        });

        it('should handle valid query parameters', async () => {
            mockRequest = {
                query: {
                    format: 'json',
                    offset: '10',
                    limit: '25',
                    fromDateTime: '2023-01-01T00:00:00Z',
                    toDateTime: '2023-12-31T23:59:59Z'
                }
            };

            const mockRepository = {
                findBy: jest.fn().mockResolvedValue([]),
                save: jest.fn(),
            };

            (AppDataSource.manager.getRepository as jest.Mock).mockReturnValue(mockRepository);

            await MembersController.getMembersByQuery(mockRequest as Request, mockResponse as Response);

            // Should attempt to call the API since no cached data
            expect(mockResponse.status).not.toHaveBeenCalledWith(500);
        });

        it('should handle empty query parameters', async () => {
            mockRequest = {
                query: {}
            };

            const mockRepository = {
                findBy: jest.fn().mockResolvedValue([]),
                save: jest.fn(),
            };

            (AppDataSource.manager.getRepository as jest.Mock).mockReturnValue(mockRepository);

            await MembersController.getMembersByQuery(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).not.toHaveBeenCalledWith(500);
        });

        it('should handle database errors during cache lookup', async () => {
            mockRequest = {
                query: {
                    format: 'json',
                    offset: '0',
                    limit: '10'
                }
            };

            const mockRepository = {
                findBy: jest.fn().mockRejectedValue(new Error('Database error')),
                save: jest.fn(),
            };

            (AppDataSource.manager.getRepository as jest.Mock).mockReturnValue(mockRepository);

            // Mock console.warn to avoid test output
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

            await MembersController.getMembersByQuery(mockRequest as Request, mockResponse as Response);

            expect(consoleWarnSpy).toHaveBeenCalledWith('No members table exists yet.');
            expect(mockResponse.status).not.toHaveBeenCalledWith(500);

            consoleWarnSpy.mockRestore();
        });

        it('should use cached data when available', async () => {
            mockRequest = {
                query: {
                    search: 'test',
                    state: 'CA'
                }
            };

            const cachedMembers = [
                { id: 1, name: 'John Doe', bioguideId: 'D0001' },
                { id: 2, name: 'Jane Smith', bioguideId: 'R0002' }
            ];

            const mockRepository = {
                findBy: jest.fn().mockResolvedValue(cachedMembers),
                save: jest.fn(),
            };

            (AppDataSource.manager.getRepository as jest.Mock).mockReturnValue(mockRepository);

            await MembersController.getMembersByQuery(mockRequest as Request, mockResponse as Response);

            expect(mockRepository.findBy).toHaveBeenCalledWith({
                searchQuery: JSON.stringify(mockRequest.query)
            });
            expect(mockResponse.json).toHaveBeenCalledWith({ members: cachedMembers });
        });

        it('should handle large datasets with pagination', async () => {
            mockRequest = {
                query: {
                    format: 'json',
                    offset: '100',
                    limit: '50'
                }
            };

            const mockRepository = {
                findBy: jest.fn().mockResolvedValue([]),
                save: jest.fn(),
            };

            (AppDataSource.manager.getRepository as jest.Mock).mockReturnValue(mockRepository);

            await MembersController.getMembersByQuery(mockRequest as Request, mockResponse as Response);

            // Should attempt to call API with pagination parameters
            expect(mockResponse.status).not.toHaveBeenCalledWith(500);
        });
    });
});
