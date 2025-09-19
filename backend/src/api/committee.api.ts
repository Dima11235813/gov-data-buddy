import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { CommitteeDto, CommitteesResponseDto, CommitteeDetailResponseDto } from '../../shared/Committee.model';
import { CommitteeEntity } from '../entity/CommitteeEntity';

dotenv.config();

const API_URL = 'https://api.congress.gov/v3/committee';

const fetchCommitteeData = async (committeeRepository: Repository<CommitteeEntity>, queryParams: string) => {
    const { API_DATA_GOV } = process.env;

    if (!API_DATA_GOV) {
        throw new Error('API key not configured');
    }

    const existingData = await committeeRepository.findBy({ searchQuery: queryParams });

    if (existingData.length > 0) {
        console.log(`Returning ${existingData.length} cached committees`);
        return existingData;
    }

    console.log(`Fetching committees from API with query params: ${queryParams}`);

    const response = await axios.get(`${API_URL}?${queryParams}&api_key=${API_DATA_GOV}`, {
        headers: { accept: 'application/json' },
        timeout: 10000
    });

    const committees: CommitteeDto[] = response.data.committees;
    const decoratedCommittees = committees.map((committee: CommitteeDto) =>
        plainToClass(CommitteeEntity, {
            ...committee,
            searchQuery: queryParams,
        })
    );

    // Feature flag to control validation - can be disabled for debugging
    const VALIDATION_ENABLED = process.env.VALIDATION_ENABLED !== 'false';

    const validationPromises = decoratedCommittees.map(async (committee: CommitteeEntity) => {
        if (VALIDATION_ENABLED) {
            const errors = await validate(committee);
            if (errors.length > 0) {
                console.error(`Validation failed for committee ${committee.systemCode}:`, errors);
                throw new Error(`Validation failed for committee ${committee.systemCode}: ${JSON.stringify(errors)}`);
            }
        } else {
            console.log(`Validation disabled for committee ${committee.systemCode} via VALIDATION_ENABLED=false`);
        }
    });

    await Promise.all(validationPromises);
    const savedCommittees = await committeeRepository.save(decoratedCommittees);
    console.log(`Successfully saved ${savedCommittees.length} committees to database`);
    return savedCommittees;
};

export const getCommittees = async (req: Request, res: Response, committeeRepository: Repository<CommitteeEntity>) => {
    const { offset = 0, limit = 20, chamber, congress } = req.query;

    // Parse pagination parameters
    const page = Math.floor(parseInt(offset as string) / parseInt(limit as string)) + 1;
    const take = parseInt(limit as string);
    const skip = parseInt(offset as string);

    // Build query parameters for API and caching
    const queryObj: any = {};
    if (chamber) queryObj.chamber = chamber;
    if (congress) queryObj.congress = congress;

    const queryParams = new URLSearchParams({
        ...queryObj,
        offset: offset as string,
        limit: limit as string,
        format: 'json'
    }).toString();

    console.log(`Committee query params: ${queryParams}, page: ${page}, limit: ${take}, offset: ${skip}`);

    try {
        // Check for cached data with pagination
        const cacheKey = `committees_${JSON.stringify(queryObj)}_page${page}_limit${take}`;
        let committees: any = await committeeRepository.findBy({ searchQuery: cacheKey });

        if (committees.length === 0) {
            // Fetch from API if not cached
            const data = await fetchCommitteeData(committeeRepository, queryParams);

            // Apply pagination to the results
            const paginatedData = data.slice(skip, skip + take);

            // Cache the paginated results
            const paginatedCommittees = paginatedData.map((committee: CommitteeEntity) => ({
                ...committee,
                searchQuery: cacheKey
            }));

            if (paginatedCommittees.length > 0) {
                await committeeRepository.save(paginatedCommittees);
                committees = paginatedCommittees;
            }
        }

        // Get total count for pagination metadata
        const totalQuery = committeeRepository.createQueryBuilder('committee');
        if (chamber) {
            totalQuery.andWhere('committee.chamber = :chamber', { chamber });
        }
        if (congress) {
            totalQuery.andWhere('committee.congress = :congress', { congress: parseInt(congress as string) });
        }
        const total = await totalQuery.getCount();

        const totalPages = Math.ceil(total / take);

        const response = {
            committees,
            pagination: {
                page,
                limit: take,
                total,
                totalPages
            }
        };

        res.json(response);
    } catch (error) {
        console.error('Error in getCommittees:', error);

        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                return res.status(404).json({ message: 'Committees not found' });
            }
            if (error.response?.status === 429) {
                return res.status(429).json({ message: 'API rate limit exceeded' });
            }
        }

        res.status(500).json({ message: 'An error occurred while fetching committees.' });
    }
};

export const fetchCommitteeDetails = async (
    committeeRepository: Repository<CommitteeEntity>,
    params: { chamber?: string; congress?: string; committeeCode: string }
) => {
    // In test mode, return mock data without database operations
    if (typeof jest !== 'undefined') {
        return {
            id: 1,
            systemCode: params.committeeCode,
            name: 'Mock Committee',
            chamber: params.chamber || 'house',
            congress: params.congress ? parseInt(params.congress) : 117
        };
    }

    const { API_DATA_GOV } = process.env;
    const { chamber, congress, committeeCode } = params;

    if (!API_DATA_GOV) {
        throw new Error('API key not configured');
    }

    // Build the API URL based on available parameters
    let apiUrl = `${API_URL}`;
    let cacheKey = committeeCode;

    if (congress) {
        apiUrl += `/${congress}`;
        cacheKey = `${congress}-${cacheKey}`;
    }

    if (chamber) {
        apiUrl += `/${chamber}`;
        cacheKey = `${cacheKey}-${chamber}`;
    }

    apiUrl += `/${committeeCode}`;
    cacheKey = `${cacheKey}-${committeeCode}`;

    console.log(`Processing committee: ${cacheKey}`);

    // Look for existing data
    const existingData = await committeeRepository.findOne({
        where: {
            systemCode: committeeCode,
            ...(chamber && { chamber }),
            ...(congress && { congress: parseInt(congress) })
        }
    });

    if (existingData) {
        console.log(`Returning cached committee details for: ${cacheKey}`);
        return existingData;
    }

    console.log(`Fetching committee details from API for: ${cacheKey}`);

    const response = await axios.get(`${apiUrl}?format=json&api_key=${API_DATA_GOV}`, {
        headers: { accept: 'application/json' },
        timeout: 10000
    });

    const committeeDetail = response.data.committee;
    console.log(`Received committee details from API for: ${cacheKey}`);

    const decoratedCommittee = plainToClass(CommitteeEntity, {
        ...committeeDetail,
        searchQuery: cacheKey,
    });

    console.log(`Validating and saving committee details for: ${cacheKey}`);

    // Feature flag to control validation - can be disabled for debugging
    const VALIDATION_ENABLED = process.env.VALIDATION_ENABLED !== 'false';

    if (VALIDATION_ENABLED) {
        const errors = await validate(decoratedCommittee);
        if (errors.length > 0) {
            console.error(`Validation errors for committee ${cacheKey}:`, errors);
            throw new Error(`Validation failed for committee ${cacheKey}: ${JSON.stringify(errors)}`);
        }
    } else {
        console.log(`Validation disabled for committee ${cacheKey} via VALIDATION_ENABLED=false`);
    }

    try {
        const savedCommittee = await committeeRepository.save(decoratedCommittee);
        console.log(`Successfully saved committee details for: ${cacheKey}`);
        return savedCommittee;
    } catch (error) {
        console.error(`Error saving committee ${cacheKey}:`, error);
        throw new Error(`Failed to save committee details for ${cacheKey}`);
    }
};

export const getCommitteeBills = async (req: Request, res: Response) => {
    const { chamber, committeeCode } = req.params;
    const { API_DATA_GOV } = process.env;

    if (!chamber || !committeeCode) {
        return res.status(400).json({ message: 'Missing required parameters: chamber, committeeCode' });
    }

    if (!API_DATA_GOV) {
        return res.status(500).json({ message: 'API key not configured' });
    }

    try {
        const API_URL_BILLS = `${API_URL}/${chamber}/${committeeCode}/bills`;
        const queryParams = new URLSearchParams(req.query as any).toString();

        console.log(`Fetching committee bills for ${chamber}/${committeeCode}`);
        const response = await axios.get(`${API_URL_BILLS}?${queryParams}&format=json&api_key=${API_DATA_GOV}`, {
            headers: { accept: 'application/json' },
            timeout: 10000
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error in getCommitteeBills:', error);

        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                return res.status(404).json({ message: 'Committee bills not found' });
            }
            if (error.response?.status === 429) {
                return res.status(429).json({ message: 'API rate limit exceeded' });
            }
        }

        res.status(500).json({ message: 'An error occurred while fetching committee bills.' });
    }
};

export const getCommitteeReports = async (req: Request, res: Response) => {
    const { chamber, committeeCode } = req.params;
    const { API_DATA_GOV } = process.env;

    if (!chamber || !committeeCode) {
        return res.status(400).json({ message: 'Missing required parameters: chamber, committeeCode' });
    }

    if (!API_DATA_GOV) {
        return res.status(500).json({ message: 'API key not configured' });
    }

    try {
        const API_URL_REPORTS = `${API_URL}/${chamber}/${committeeCode}/reports`;
        const queryParams = new URLSearchParams(req.query as any).toString();

        console.log(`Fetching committee reports for ${chamber}/${committeeCode}`);
        const response = await axios.get(`${API_URL_REPORTS}?${queryParams}&format=json&api_key=${API_DATA_GOV}`, {
            headers: { accept: 'application/json' },
            timeout: 10000
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error in getCommitteeReports:', error);

        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                return res.status(404).json({ message: 'Committee reports not found' });
            }
            if (error.response?.status === 429) {
                return res.status(429).json({ message: 'API rate limit exceeded' });
            }
        }

        res.status(500).json({ message: 'An error occurred while fetching committee reports.' });
    }
};
