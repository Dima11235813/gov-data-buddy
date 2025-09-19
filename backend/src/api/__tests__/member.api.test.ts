import axios from 'axios';
import { fetchMemberDetailsFromAPI, getMembers } from '../member.api';
import { Repository } from 'typeorm';
import { Member } from '../../entity/MemberEntity';
import { Request, Response } from 'express';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Member API', () => {
    let mockRepository: jest.Mocked<Repository<Member>>;

    beforeEach(() => {
        mockRepository = {
            save: jest.fn(),
            findOneBy: jest.fn(),
        } as any;

        // Mock environment variable
        process.env.API_DATA_GOV = 'test-api-key';
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchMemberDetailsFromAPI', () => {
        it('should fetch member details successfully', async () => {
            const mockResponse = {
                data: {
                    member: {
                        bioguideId: 'D0001',
                        name: 'John Doe',
                        party: 'D',
                        state: 'CA'
                    }
                }
            };

            mockedAxios.get.mockResolvedValueOnce(mockResponse);

            const result = await fetchMemberDetailsFromAPI('D0001', mockRepository);

            expect(mockedAxios.get).toHaveBeenCalledWith(
                'https://api.congress.gov/v3/member/D0001?format=json&api_key=test-api-key',
                expect.objectContaining({
                    headers: { accept: 'application/json' },
                    timeout: 10000
                })
            );
            expect(mockRepository.save).toHaveBeenCalledWith(mockResponse.data.member);
            expect(result).toEqual(mockResponse.data);
        });

        it('should handle member not found', async () => {
            const mockError = {
                response: { status: 404 }
            };

            mockedAxios.get.mockRejectedValueOnce(mockError);

            await expect(fetchMemberDetailsFromAPI('INVALID', mockRepository))
                .rejects
                .toThrow('Member with bioguideId INVALID not found');
        });

        it('should handle API rate limit', async () => {
            const mockError = {
                response: { status: 429 }
            };

            mockedAxios.get.mockRejectedValueOnce(mockError);

            await expect(fetchMemberDetailsFromAPI('D0001', mockRepository))
                .rejects
                .toThrow('API rate limit exceeded. Please try again later.');
        });

        it('should handle missing API key', async () => {
            delete process.env.API_DATA_GOV;

            await expect(fetchMemberDetailsFromAPI('D0001', mockRepository))
                .rejects
                .toThrow('API_DATA_GOV environment variable is not set');
        });

        it('should handle database save failure gracefully', async () => {
            const mockResponse = {
                data: {
                    member: {
                        bioguideId: 'D0001',
                        name: 'John Doe'
                    }
                }
            };

            mockedAxios.get.mockResolvedValueOnce(mockResponse);
            mockRepository.save.mockRejectedValueOnce(new Error('Database error'));

            const result = await fetchMemberDetailsFromAPI('D0001', mockRepository);

            // Should still return data even if save fails
            expect(result).toEqual(mockResponse.data);
            expect(mockRepository.save).toHaveBeenCalled();
        });
    });

    describe('getMembers', () => {
        let mockReq: Partial<Request>;
        let mockRes: Partial<Response>;
        let responseObject: any;

        beforeEach(() => {
            responseObject = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            mockRes = responseObject;

            mockReq = {
                query: {}
            };
        });

        it('should handle successful member fetch with default parameters', async () => {
            const mockApiResponse = {
                data: {
                    members: [
                        {
                            bioguideId: 'D0001',
                            name: 'John Doe',
                            party: 'D',
                            state: 'CA'
                        }
                    ]
                }
            };

            mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

            const params = {
                format: 'json',
                offset: 0,
                limit: 10,
                fromDateTime: '2023-01-01T00:00:00Z',
                toDateTime: '2023-12-31T23:59:59Z'
            };

            await getMembers(mockReq as Request, mockRes as Response, mockRepository, params);

            expect(mockedAxios.get).toHaveBeenCalledWith(
                'https://api.congress.gov/v3/member?format=json&offset=0&limit=10&fromDateTime=2023-01-01T00:00:00Z&toDateTime=2023-12-31T23:59:59Z&api_key=test-api-key',
                expect.objectContaining({
                    headers: { accept: 'application/json' },
                    timeout: 15000
                })
            );
            expect(mockRes.json).toHaveBeenCalledWith(mockApiResponse.data);
        });

        it('should handle API errors gracefully', async () => {
            const mockError = {
                response: { status: 429 }
            };

            mockedAxios.get.mockRejectedValueOnce(mockError);

            const params = {
                format: 'json',
                offset: 0,
                limit: 10
            };

            await getMembers(mockReq as Request, mockRes as Response, mockRepository, params);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'An error occurred while fetching data from the API.',
                error: 'API rate limit exceeded. Please try again later.'
            });
        });

        it('should handle missing API key', async () => {
            delete process.env.API_DATA_GOV;

            const params = {
                format: 'json',
                offset: 0,
                limit: 10
            };

            await getMembers(mockReq as Request, mockRes as Response, mockRepository, params);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'An error occurred while fetching data from the API.',
                error: 'API_DATA_GOV environment variable is not set'
            });
        });

        it('should save members to database with validation', async () => {
            const mockApiResponse = {
                data: {
                    members: [
                        {
                            bioguideId: 'D0001',
                            name: 'John Doe',
                            party: 'D',
                            state: 'CA',
                            depiction: { attribution: 'test', imageUrl: 'test.jpg' },
                            served: { House: [{ start: 2020, end: null }] }
                        }
                    ]
                }
            };

            mockedAxios.get.mockResolvedValueOnce(mockApiResponse);
            mockRepository.save.mockResolvedValueOnce({} as any);

            const params = {
                format: 'json',
                offset: 0,
                limit: 10
            };

            await getMembers(mockReq as Request, mockRes as Response, mockRepository, params);

            expect(mockRepository.save).toHaveBeenCalledWith(
                expect.objectContaining({
                    bioguideId: 'D0001',
                    name: 'John Doe',
                    searchQuery: JSON.stringify(mockApiResponse.data.members[0])
                })
            );
        });

        it('should handle empty members array', async () => {
            const mockApiResponse = {
                data: {
                    members: []
                }
            };

            mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

            const params = {
                format: 'json',
                offset: 0,
                limit: 10
            };

            await getMembers(mockReq as Request, mockRes as Response, mockRepository, params);

            expect(mockRepository.save).not.toHaveBeenCalled();
            expect(mockRes.json).toHaveBeenCalledWith(mockApiResponse.data);
        });
    });
});
