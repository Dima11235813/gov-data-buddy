import { Request, Response } from 'express';
import {
    getMembers,
    fetchMemberDetailsFromAPI,
    fetchMembersByCongress,
    fetchMembersByState,
    fetchMembersByStateDistrict,
    fetchMembersByCongressStateDistrict,
    fetchMemberSponsoredLegislation,
    fetchMemberCosponsoredLegislation
} from "../api/member.api";
import {
    getCurrentMemberPicture,
    getMemberPictureById,
    getMemberPictureData,
    downloadAndStoreMemberPicture
} from "../api/member-picture.api";
import { AppDataSource } from "../datasource/sqlite-datasource";
import { Member } from "../entity/MemberEntity";
import { MemberPicture } from "../entity/MemberPictureEntity";
import { parseDateParams, createDateRange } from "../../shared/utils/date-utils";
import { LoggerService } from '../service/logger.service';
import { createMemberCacheService, MemberCacheService } from '../service/member-cache.service';

export namespace MembersController {
    const memberRepository = AppDataSource.manager.getRepository(Member);
    const pictureRepository = AppDataSource.manager.getRepository(MemberPicture);

    // Initialize services
    const logger = new LoggerService();
    const memberCacheService = createMemberCacheService(logger, memberRepository, pictureRepository);

    export const getMembersByQuery = async (req: Request, res: Response) => {
        console.log(`getMembersByQuery`)
        const { format = 'json', offset = 0, limit = 12, fromDateTime, toDateTime } = req.query;
        console.log(`Query:`)
        console.log(req.query)

        // Parse pagination parameters
        const page = Math.floor(parseInt(offset as string) / parseInt(limit as string)) + 1;
        const take = parseInt(limit as string);
        const skip = parseInt(offset as string);

        // 🔍 CACHE LOOKUP: Try to find cached query and members FIRST
        const { QueryService, QueryEndpointEnum } = require('../service/query.service');
        const { GovApiQuery } = require('../entity/GovApiQuery');
        const { parseQueryParams } = require('../api/member.api');

        const queryService = new QueryService(memberRepository.manager.getRepository(GovApiQuery));

        // Convert req.query to query string format first, then parse it consistently
        const queryString = new URLSearchParams(req.query as any).toString();
        const normalizedParams = parseQueryParams(queryString);
        // Add format parameter to match API layer normalization
        normalizedParams.format = req.query.format || 'json';

        let cachedMembers: Member[] = [];
        try {
            // Find existing query record
            const sortedNormalizedParams = Object.keys(normalizedParams).sort().reduce((sorted, key) => {
                sorted[key] = normalizedParams[key];
                return sorted;
            }, {} as Record<string, any>);
            const normalizedParamsStr = JSON.stringify(sortedNormalizedParams);

            const existingQuery = await queryService.queryRepository.findOne({
                where: {
                    endpoint: QueryEndpointEnum.MEMBERS,
                    normalizedParams: normalizedParamsStr
                }
            });

            if (existingQuery) {
                // Update hit count
                existingQuery.hitCount += 1;
                existingQuery.lastExecutedAt = new Date();
                await queryService.queryRepository.save(existingQuery);

                // Find members associated with this query
                cachedMembers = await memberRepository.findBy({ queryId: existingQuery.id });
                console.log(`✅ CACHE HIT: Found ${cachedMembers.length} cached members for query ID: ${existingQuery.id}`);

            } else {
                console.log(`❌ CACHE MISS: No cached query found for: ${JSON.stringify(normalizedParams)}`);
            }
        } catch (e) {
            console.log(e);
            console.warn(`Database query failed, will fetch from API.`);
        }

        if (cachedMembers.length > 0) {
            console.log(`🚀 RETURNING CACHED DATA: ${cachedMembers.length} members`);
            // Apply pagination to cached results
            const paginatedMembers = cachedMembers.slice(skip, skip + take);

            // Attach current picture data for each member
            const pictureRepository = memberRepository.manager.getRepository(MemberPicture);
            const membersWithPictures = await Promise.all(
                paginatedMembers.map(async (member) => {
                    try {
                        const currentPicture = await pictureRepository.findOne({
                            where: { bioguideId: member.bioguideId },
                            order: { createdAt: 'DESC' }
                        });
                        if (currentPicture) {
                            const pictureData = getMemberPictureData(currentPicture);
                            if (pictureData) {
                                return {
                                    ...member,
                                    currentPicture: {
                                        id: currentPicture.id,
                                        base64Data: pictureData.base64Data,
                                        contentType: pictureData.contentType,
                                        version: currentPicture.version,
                                        isCurrentVersion: currentPicture.isCurrentVersion,
                                        attribution: currentPicture.attribution
                                    }
                                };
                            }
                        }
                        return member;
                    } catch (pictureError) {
                        console.warn(`Failed to attach picture data for ${member.bioguideId}:`, pictureError);
                        return member;
                    }
                })
            );

            // Get total count for pagination metadata
            const total = cachedMembers.length;
            const totalPages = Math.ceil(total / take);

            res.json({
                members: membersWithPictures,
                pagination: {
                    page,
                    limit: take,
                    total,
                    totalPages
                }
            });
            return;
        } else {
            // 🌐 CACHE MISS: Fetch from API
            console.log(`🌐 CACHE MISS: Fetching from API - ${JSON.stringify(normalizedParams)}`);
            console.log(`Getting members from api gov!`);

            // Fetch from API and handle pagination there
            getMembers(req, res, memberRepository, { format, offset, limit, fromDateTime, toDateTime } as any);
        }
    }

    export const getMemberDetails = async (req: Request, res: Response) => {
        const { bioguideId } = req.params;
        const startTime = Date.now();

        try {
            logger.info(`Processing member details request`, {
                operation: 'get-member-details',
                bioguideId,
                endpoint: req.originalUrl
            });

            // Try to get from cache first (runtime + database)
            const cachedData = await memberCacheService.getMemberData(bioguideId);
            if (cachedData) {
                logger.logPerformance('get-member-details-total', Date.now() - startTime, {
                    operation: 'get-member-details-cache-hit',
                    bioguideId,
                    cache: { hit: true, source: 'service' }
                });

                res.json({ member: cachedData });
                return;
            }

            // Cache miss - fetch from API
            logger.logCacheMiss('get-member-details', bioguideId, {
                operation: 'get-member-details-cache-miss',
                bioguideId
            });

            const apiStartTime = Date.now();
            const data = await fetchMemberDetailsFromAPI(bioguideId, memberRepository);

            logger.logApiCall(
                `https://api.congress.gov/v3/member/${bioguideId}`,
                'GET',
                200,
                Date.now() - apiStartTime,
                {
                    operation: 'fetch-member-api',
                    bioguideId
                }
            );

            // Store the fresh data in cache
            if (data.member) {
                await memberCacheService.setMemberData(bioguideId, data.member);
                logger.info(`Stored fresh member data in cache: ${bioguideId}`, {
                    operation: 'member-details-cache-store',
                    bioguideId
                });
            }

            logger.logPerformance('get-member-details-total', Date.now() - startTime, {
                operation: 'get-member-details-total',
                bioguideId,
                cache: { hit: false }
            });

            res.json(data);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            let statusCode = 500;
            let message = 'An error occurred while fetching member data.';

            if (errorMessage.includes('not found')) {
                statusCode = 404;
                message = errorMessage;
            } else if (errorMessage.includes('rate limit')) {
                statusCode = 429;
                message = errorMessage;
            }

            logger.error(`Error fetching member details: ${bioguideId}`, {
                operation: 'get-member-details-error',
                bioguideId,
                endpoint: req.originalUrl
            }, error as Error);

            res.status(statusCode).json({
                message,
                error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
            });
        }
    }

    export const getMembersByCongress = async (req: Request, res: Response) => {
        const { congress } = req.params;

        try {
            const congressNum = parseInt(congress);
            if (isNaN(congressNum)) {
                return res.status(400).json({
                    message: 'Invalid congress number. Must be a valid integer.'
                });
            }

            // Try to get from database first (cache)
            const { QueryService, QueryEndpointEnum } = require('../service/query.service');
            const { GovApiQuery } = require('../entity/GovApiQuery');
            const { parseQueryParams } = require('../api/member.api');

            const queryService = new QueryService(memberRepository.manager.getRepository(GovApiQuery));
            let cachedMembers: Member[] = [];

            try {
                // Find existing query record
                const existingQuery = await queryService.queryRepository.findOne({
                    where: {
                        endpoint: QueryEndpointEnum.MEMBERS,
                        normalizedParams: JSON.stringify({ congress: congressNum })
                    }
                });

                if (existingQuery) {
                    // Update hit count
                    existingQuery.hitCount += 1;
                    existingQuery.lastExecutedAt = new Date();
                    await queryService.queryRepository.save(existingQuery);

                    // Find members associated with this query
                    cachedMembers = await memberRepository.findBy({ queryId: existingQuery.id });
                    console.log(`Found ${cachedMembers.length} cached members for congress ${congressNum}`);
                }
            } catch (dbError) {
                console.warn('Database query failed, falling back to API:', dbError);
            }

            if (cachedMembers.length > 0) {
                console.log(`Returning ${cachedMembers.length} cached members for congress ${congressNum}`);
                return res.json({ members: cachedMembers });
            }

            // If not in cache, fetch from API
            const data = await fetchMembersByCongress(congressNum, memberRepository);
            res.json(data);

        } catch (error) {
            console.error(`Error fetching members for congress ${congress}:`, error);

            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            let statusCode = 500;
            let message = 'An error occurred while fetching members.';

            if (errorMessage.includes('not found') || errorMessage.includes('No members found')) {
                statusCode = 404;
                message = errorMessage;
            } else if (errorMessage.includes('rate limit')) {
                statusCode = 429;
                message = errorMessage;
            } else if (errorMessage.includes('Invalid parameters')) {
                statusCode = 400;
                message = errorMessage;
            }

            res.status(statusCode).json({
                message,
                error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
            });
        }
    }

    export const getMembersByState = async (req: Request, res: Response) => {
        const { stateCode } = req.params;

        try {
            // Validate state code format (should be 2 characters)
            if (!stateCode || stateCode.length !== 2) {
                return res.status(400).json({
                    message: 'Invalid state code. Must be a 2-character state abbreviation.'
                });
            }

            // Try to get from database first (cache)
            const { QueryService, QueryEndpointEnum } = require('../service/query.service');
            const { GovApiQuery } = require('../entity/GovApiQuery');
            const { parseQueryParams } = require('../api/member.api');

            const queryService = new QueryService(memberRepository.manager.getRepository(GovApiQuery));
            let cachedMembers: Member[] = [];

            try {
                // Find existing query record
                const existingQuery = await queryService.queryRepository.findOne({
                    where: {
                        endpoint: QueryEndpointEnum.MEMBERS,
                        normalizedParams: JSON.stringify({ state: stateCode })
                    }
                });

                if (existingQuery) {
                    // Update hit count
                    existingQuery.hitCount += 1;
                    existingQuery.lastExecutedAt = new Date();
                    await queryService.queryRepository.save(existingQuery);

                    // Find members associated with this query
                    cachedMembers = await memberRepository.findBy({ queryId: existingQuery.id });
                    console.log(`Found ${cachedMembers.length} cached members for state ${stateCode}`);
                }
            } catch (dbError) {
                console.warn('Database query failed, falling back to API:', dbError);
            }

            if (cachedMembers.length > 0) {
                console.log(`Returning ${cachedMembers.length} cached members for state ${stateCode}`);
                return res.json({ members: cachedMembers });
            }

            // If not in cache, fetch from API
            const data = await fetchMembersByState(stateCode, memberRepository);
            res.json(data);

        } catch (error) {
            console.error(`Error fetching members for state ${stateCode}:`, error);

            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            let statusCode = 500;
            let message = 'An error occurred while fetching members.';

            if (errorMessage.includes('not found') || errorMessage.includes('No members found')) {
                statusCode = 404;
                message = errorMessage;
            } else if (errorMessage.includes('rate limit')) {
                statusCode = 429;
                message = errorMessage;
            } else if (errorMessage.includes('Invalid parameters')) {
                statusCode = 400;
                message = errorMessage;
            }

            res.status(statusCode).json({
                message,
                error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
            });
        }
    }

    export const getMembersByStateDistrict = async (req: Request, res: Response) => {
        const { stateCode, district } = req.params;

        try {
            // Validate state code format
            if (!stateCode || stateCode.length !== 2) {
                return res.status(400).json({
                    message: 'Invalid state code. Must be a 2-character state abbreviation.'
                });
            }

            // Validate district number
            const districtNum = parseInt(district);
            if (isNaN(districtNum) || districtNum < 1) {
                return res.status(400).json({
                    message: 'Invalid district number. Must be a positive integer.'
                });
            }

            // Try to get from database first (cache)
            const { QueryService, QueryEndpointEnum } = require('../service/query.service');
            const { GovApiQuery } = require('../entity/GovApiQuery');
            const { parseQueryParams } = require('../api/member.api');

            const queryService = new QueryService(memberRepository.manager.getRepository(GovApiQuery));
            let cachedMembers: Member[] = [];

            try {
                // Find existing query record
                const existingQuery = await queryService.queryRepository.findOne({
                    where: {
                        endpoint: QueryEndpointEnum.MEMBERS,
                        normalizedParams: JSON.stringify({ state: stateCode, district: districtNum })
                    }
                });

                if (existingQuery) {
                    // Update hit count
                    existingQuery.hitCount += 1;
                    existingQuery.lastExecutedAt = new Date();
                    await queryService.queryRepository.save(existingQuery);

                    // Find members associated with this query
                    cachedMembers = await memberRepository.findBy({ queryId: existingQuery.id });
                    console.log(`Found ${cachedMembers.length} cached members for state ${stateCode}, district ${districtNum}`);
                }
            } catch (dbError) {
                console.warn('Database query failed, falling back to API:', dbError);
            }

            if (cachedMembers.length > 0) {
                console.log(`Returning ${cachedMembers.length} cached members for state ${stateCode}, district ${districtNum}`);
                return res.json({ members: cachedMembers });
            }

            // If not in cache, fetch from API
            const data = await fetchMembersByStateDistrict(stateCode, districtNum, memberRepository);
            res.json(data);

        } catch (error) {
            console.error(`Error fetching members for state ${stateCode}, district ${district}:`, error);

            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            let statusCode = 500;
            let message = 'An error occurred while fetching members.';

            if (errorMessage.includes('not found') || errorMessage.includes('No members found')) {
                statusCode = 404;
                message = errorMessage;
            } else if (errorMessage.includes('rate limit')) {
                statusCode = 429;
                message = errorMessage;
            } else if (errorMessage.includes('Invalid parameters')) {
                statusCode = 400;
                message = errorMessage;
            }

            res.status(statusCode).json({
                message,
                error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
            });
        }
    }

    export const getMembersByCongressStateDistrict = async (req: Request, res: Response) => {
        const { congress, stateCode, district } = req.params;

        try {
            // Validate congress number
            const congressNum = parseInt(congress);
            if (isNaN(congressNum)) {
                return res.status(400).json({
                    message: 'Invalid congress number. Must be a valid integer.'
                });
            }

            // Validate state code format
            if (!stateCode || stateCode.length !== 2) {
                return res.status(400).json({
                    message: 'Invalid state code. Must be a 2-character state abbreviation.'
                });
            }

            // Validate district number
            const districtNum = parseInt(district);
            if (isNaN(districtNum) || districtNum < 1) {
                return res.status(400).json({
                    message: 'Invalid district number. Must be a positive integer.'
                });
            }

            // Try to get from database first (cache)
            const { QueryService, QueryEndpointEnum } = require('../service/query.service');
            const { GovApiQuery } = require('../entity/GovApiQuery');
            const { parseQueryParams } = require('../api/member.api');

            const queryService = new QueryService(memberRepository.manager.getRepository(GovApiQuery));
            let cachedMembers: Member[] = [];

            try {
                // Find existing query record
                const existingQuery = await queryService.queryRepository.findOne({
                    where: {
                        endpoint: QueryEndpointEnum.MEMBERS,
                        normalizedParams: JSON.stringify({ congress: congressNum, state: stateCode, district: districtNum })
                    }
                });

                if (existingQuery) {
                    // Update hit count
                    existingQuery.hitCount += 1;
                    existingQuery.lastExecutedAt = new Date();
                    await queryService.queryRepository.save(existingQuery);

                    // Find members associated with this query
                    cachedMembers = await memberRepository.findBy({ queryId: existingQuery.id });
                    console.log(`Found ${cachedMembers.length} cached members for congress ${congressNum}, state ${stateCode}, district ${districtNum}`);
                }
            } catch (dbError) {
                console.warn('Database query failed, falling back to API:', dbError);
            }

            if (cachedMembers.length > 0) {
                console.log(`Returning ${cachedMembers.length} cached members for congress ${congressNum}, state ${stateCode}, district ${districtNum}`);
                return res.json({ members: cachedMembers });
            }

            // If not in cache, fetch from API
            const data = await fetchMembersByCongressStateDistrict(congressNum, stateCode, districtNum, memberRepository);
            res.json(data);

        } catch (error) {
            console.error(`Error fetching members for congress ${congress}, state ${stateCode}, district ${district}:`, error);

            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            let statusCode = 500;
            let message = 'An error occurred while fetching members.';

            if (errorMessage.includes('not found') || errorMessage.includes('No members found')) {
                statusCode = 404;
                message = errorMessage;
            } else if (errorMessage.includes('rate limit')) {
                statusCode = 429;
                message = errorMessage;
            } else if (errorMessage.includes('Invalid parameters')) {
                statusCode = 400;
                message = errorMessage;
            }

            res.status(statusCode).json({
                message,
                error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
            });
        }
    }

    export const getMemberPicture = async (req: Request, res: Response) => {
        const { bioguideId, pictureId } = req.params;

        try {
            const pictureRepository = AppDataSource.manager.getRepository(MemberPicture);
            let picture: MemberPicture | null = null;

            if (pictureId) {
                // Get specific picture by ID
                const id = parseInt(pictureId);
                if (isNaN(id)) {
                    return res.status(400).json({ message: 'Invalid picture ID' });
                }
                picture = await getMemberPictureById(id, pictureRepository);
            } else {
                // Get current picture for member
                picture = await getCurrentMemberPicture(bioguideId, pictureRepository);
            }

            if (!picture) {
                return res.status(404).json({ message: 'Picture not found' });
            }

            // Verify the picture belongs to the requested member
            if (picture.bioguideId !== bioguideId) {
                return res.status(403).json({ message: 'Picture does not belong to this member' });
            }

            const pictureData = getMemberPictureData(picture);
            if (!pictureData) {
                return res.status(404).json({ message: 'Picture data not found' });
            }

            // Return the base64 data directly as JSON
            res.json({
                id: picture.id,
                bioguideId: picture.bioguideId,
                base64Data: pictureData.base64Data,
                contentType: pictureData.contentType,
                version: picture.version,
                attribution: picture.attribution,
                createdAt: picture.createdAt
            });

        } catch (error) {
            console.error('Error serving member picture:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    export const refreshMemberPicture = async (req: Request, res: Response) => {
        const { bioguideId } = req.params;

        try {
            // Get member details to find the current depiction URL
            const memberRepository = AppDataSource.manager.getRepository(Member);
            const pictureRepository = AppDataSource.manager.getRepository(MemberPicture);

            let member = await memberRepository.findOneBy({ bioguideId });

            if (!member) {
                // Try to fetch from API
                const data = await fetchMemberDetailsFromAPI(bioguideId, memberRepository);
                member = data.member;
            }

            if (!member?.depiction?.imageUrl) {
                return res.status(404).json({ message: 'No picture URL available for this member' });
            }

            // Download and store the new picture
            const picture = await downloadAndStoreMemberPicture(
                bioguideId,
                member.depiction.imageUrl,
                member.depiction.attribution || '',
                memberRepository,
                pictureRepository
            );

            if (!picture) {
                return res.status(500).json({ message: 'Failed to download and store picture' });
            }

            res.json({
                message: 'Picture refreshed successfully',
                picture: {
                    id: picture.id,
                    version: picture.version,
                    createdAt: picture.createdAt,
                    url: `/api/member/${bioguideId}/picture/${picture.id}`
                }
            });

        } catch (error) {
            console.error('Error refreshing member picture:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    export const getMemberPictureHistory = async (req: Request, res: Response) => {
        const { bioguideId } = req.params;

        try {
            const pictureRepository = AppDataSource.manager.getRepository(MemberPicture);
            const pictures = await pictureRepository.find({
                where: { bioguideId },
                order: { version: 'DESC', createdAt: 'DESC' },
                select: ['id', 'version', 'createdAt', 'status', 'isCurrentVersion', 'fileSize']
            });

            res.json({
                bioguideId,
                pictures: pictures.map(pic => ({
                    ...pic,
                    url: `/api/member/${bioguideId}/picture/${pic.id}`
                }))
            });

        } catch (error) {
            console.error('Error fetching member picture history:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    export const getMemberSponsoredLegislation = async (req: Request, res: Response) => {
        const { bioguideId } = req.params;
        const format = typeof req.query.format === 'string' ? req.query.format : 'json';
        const offset = typeof req.query.offset === 'string' ? parseInt(req.query.offset) : 0;
        const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit) : 20;

        try {
            const data = await fetchMemberSponsoredLegislation(bioguideId, {
                format,
                offset,
                limit
            });
            res.json(data);
        } catch (error) {
            console.error(`Error fetching sponsored legislation for ${bioguideId}:`, error);

            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            let statusCode = 500;
            let message = 'An error occurred while fetching sponsored legislation.';

            if (errorMessage.includes('not found') || errorMessage.includes('No sponsored legislation found')) {
                statusCode = 404;
                message = errorMessage;
            } else if (errorMessage.includes('rate limit')) {
                statusCode = 429;
                message = errorMessage;
            }

            res.status(statusCode).json({
                message,
                error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
            });
        }
    }

    export const getMemberCosponsoredLegislation = async (req: Request, res: Response) => {
        const { bioguideId } = req.params;
        const format = typeof req.query.format === 'string' ? req.query.format : 'json';
        const offset = typeof req.query.offset === 'string' ? parseInt(req.query.offset) : 0;
        const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit) : 20;

        try {
            const data = await fetchMemberCosponsoredLegislation(bioguideId, {
                format,
                offset,
                limit
            });
            res.json(data);
        } catch (error) {
            console.error(`Error fetching cosponsored legislation for ${bioguideId}:`, error);

            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            let statusCode = 500;
            let message = 'An error occurred while fetching cosponsored legislation.';

            if (errorMessage.includes('not found') || errorMessage.includes('No cosponsored legislation found')) {
                statusCode = 404;
                message = errorMessage;
            } else if (errorMessage.includes('rate limit')) {
                statusCode = 429;
                message = errorMessage;
            }

            res.status(statusCode).json({
                message,
                error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
            });
        }
    }
}
