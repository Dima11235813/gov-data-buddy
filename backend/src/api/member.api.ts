import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Member } from '../entity/MemberEntity';
import { MemberPicture } from '../entity/MemberPictureEntity';
import { createDateRange } from '../../shared/utils/date-utils';
import {
    downloadAndStoreMemberPicture,
    getCurrentMemberPicture,
    getMemberPictureData
} from './member-picture.api';

dotenv.config();

export const getMembers = async (
    req: Request,
    res: Response,
    memberRepository: Repository<Member>,
    params: { format: string; offset: number; limit: number; fromDateTime?: string; toDateTime?: string; }
) => {
    console.log(`Getting members from api gov!`)
    const qp = new URLSearchParams();
    qp.set('format', params.format);
    qp.set('offset', params.offset.toString());
    qp.set('limit', params.limit.toString());
    if (params.fromDateTime) qp.set('fromDateTime', params.fromDateTime);
    if (params.toDateTime) qp.set('toDateTime', params.toDateTime);
    const queryParams = qp.toString();

    console.log(`\nQuery params: ${JSON.stringify(queryParams)}`);

    try {
        const data = await fetchMemberData(memberRepository, queryParams);

        // Extract pagination info from API response and format response
        const total = data.pagination?.count || data.members?.length || 0;
        const totalPages = Math.ceil(total / params.limit);

        const paginatedData = {
            members: data.members || [],
            pagination: {
                page: Math.floor(params.offset / params.limit) + 1,
                limit: params.limit,
                total,
                totalPages
            }
        };

        res.json(paginatedData);
    } catch (error) {
        console.error('Error fetching members:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({
            message: 'An error occurred while fetching data from the API.',
            error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        });
    }
};

// Fetch sponsored legislation for a member
export const fetchMemberSponsoredLegislation = async (
    bioguideId: string,
    params: { format?: string; offset?: number; limit?: number } = {}
): Promise<any> => {
    console.log(`Getting sponsored legislation for member: ${bioguideId}`);

    const API_URL = `https://api.congress.gov/v3/member/${bioguideId}/sponsored-legislation`;
    const API_DATA_GOV = process.env.API_DATA_GOV;

    if (!API_DATA_GOV) {
        throw new Error('API_DATA_GOV environment variable is not set');
    }

    const qp = new URLSearchParams();
    qp.set('format', params.format || 'json');
    if (params.offset !== undefined) qp.set('offset', params.offset.toString());
    if (params.limit !== undefined) qp.set('limit', params.limit.toString());
    const queryParams = qp.toString();

    try {
        const response = await axios.get(`${API_URL}?${queryParams}&api_key=${API_DATA_GOV}`, {
            headers: { accept: 'application/json' },
            timeout: 10000
        });

        const data = response.data;
        console.log(`Retrieved sponsored legislation for ${bioguideId}: ${data.sponsoredLegislation?.length || 0} bills`);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error(`No sponsored legislation found for member ${bioguideId}`);
            }
            if (error.response?.status === 429) {
                throw new Error('API rate limit exceeded. Please try again later.');
            }
        }
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Error fetching sponsored legislation for ${bioguideId}:`, error);
        throw new Error(`Failed to fetch sponsored legislation: ${errorMessage}`);
    }
};

// Fetch cosponsored legislation for a member
export const fetchMemberCosponsoredLegislation = async (
    bioguideId: string,
    params: { format?: string; offset?: number; limit?: number } = {}
): Promise<any> => {
    console.log(`Getting cosponsored legislation for member: ${bioguideId}`);

    const API_URL = `https://api.congress.gov/v3/member/${bioguideId}/cosponsored-legislation`;
    const API_DATA_GOV = process.env.API_DATA_GOV;

    if (!API_DATA_GOV) {
        throw new Error('API_DATA_GOV environment variable is not set');
    }

    const qp = new URLSearchParams();
    qp.set('format', params.format || 'json');
    if (params.offset !== undefined) qp.set('offset', params.offset.toString());
    if (params.limit !== undefined) qp.set('limit', params.limit.toString());
    const queryParams = qp.toString();

    try {
        const response = await axios.get(`${API_URL}?${queryParams}&api_key=${API_DATA_GOV}`, {
            headers: { accept: 'application/json' },
            timeout: 10000
        });

        const data = response.data;
        console.log(`Retrieved cosponsored legislation for ${bioguideId}: ${data.cosponsoredLegislation?.length || 0} bills`);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error(`No cosponsored legislation found for member ${bioguideId}`);
            }
            if (error.response?.status === 429) {
                throw new Error('API rate limit exceeded. Please try again later.');
            }
        }
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Error fetching cosponsored legislation for ${bioguideId}:`, error);
        throw new Error(`Failed to fetch cosponsored legislation: ${errorMessage}`);
    }
};

export const fetchMemberDetailsFromAPI = async (
    bioguideId: string,
    memberRepository: Repository<Member>
): Promise<any> => {
    console.log(`Getting member details for bioguideId: ${bioguideId}`);

    const API_URL = `https://api.congress.gov/v3/member/${bioguideId}`;
    const API_DATA_GOV = process.env.API_DATA_GOV;

    if (!API_DATA_GOV) {
        throw new Error('API_DATA_GOV environment variable is not set');
    }

    try {
        const response = await axios.get(`${API_URL}?format=json&api_key=${API_DATA_GOV}`, {
            headers: { accept: 'application/json' },
            timeout: 10000 // 10 second timeout
        });

        const data = response.data;
        console.log(`Retrieved member details for ${bioguideId}`);

        // Optionally cache the member data
        if (data.member) {
            try {
                // Use the same caching logic as other endpoints
                const pictureRepository = memberRepository.manager.getRepository(MemberPicture);
                await cacheMemberData([data.member], memberRepository, `bioguideId=${bioguideId}`, pictureRepository);

                // Try to get current picture for this member and attach to response
                const currentPicture = await getCurrentMemberPicture(bioguideId, pictureRepository);

                if (currentPicture) {
                    const pictureData = getMemberPictureData(currentPicture);
                    if (pictureData) {
                        data.member.currentPicture = {
                            id: currentPicture.id,
                            base64Data: pictureData.base64Data,
                            contentType: pictureData.contentType,
                            version: currentPicture.version,
                            isCurrentVersion: currentPicture.isCurrentVersion,
                            attribution: currentPicture.attribution
                        };
                    }
                }

                console.log(`Member ${bioguideId} cached in database`);
            } catch (saveError) {
                console.warn(`Failed to cache member ${bioguideId}:`, saveError);
            }
        }

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error(`Member with bioguideId ${bioguideId} not found`);
            }
            if (error.response?.status === 429) {
                throw new Error('API rate limit exceeded. Please try again later.');
            }
        }
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Error fetching member ${bioguideId}:`, error);
        throw new Error(`Failed to fetch member details: ${errorMessage}`);
    }
};

// Search members by congress
export const fetchMembersByCongress = async (
    congress: number,
    memberRepository: Repository<Member>
): Promise<any> => {
    console.log(`Getting members for congress: ${congress}`);

    const API_URL = `https://api.congress.gov/v3/member/congress/${congress}`;
    const API_DATA_GOV = process.env.API_DATA_GOV;

    if (!API_DATA_GOV) {
        throw new Error('API_DATA_GOV environment variable is not set');
    }

    try {
        const response = await axios.get(`${API_URL}?format=json&api_key=${API_DATA_GOV}`, {
            headers: { accept: 'application/json' },
            timeout: 15000 // 15 second timeout
        });

        const data = response.data;
        console.log(`Retrieved ${data.members?.length || 0} members for congress ${congress}`);

        // Cache member data
        if (data.members && Array.isArray(data.members)) {
            const pictureRepository = memberRepository.manager.getRepository(MemberPicture);

            // Create query record for tracking
            const { QueryService, QueryEndpointEnum } = require('../service/query.service');
            const { GovApiQuery } = require('../entity/GovApiQuery');

            const queryService = new QueryService(memberRepository.manager.getRepository(GovApiQuery));
            const queryRecord = await queryService.findOrCreateQuery(
                QueryEndpointEnum.MEMBERS,
                { congress },
                `congress=${congress}`,
                data.members.length
            );

            await cacheMemberData(data.members, memberRepository, queryRecord.id, pictureRepository);
        }

        return data;
    } catch (error) {
        handleMemberApiError(error, `congress ${congress}`);
    }
};

// Search members by state
export const fetchMembersByState = async (
    stateCode: string,
    memberRepository: Repository<Member>
): Promise<any> => {
    console.log(`Getting members for state: ${stateCode}`);

    const API_URL = `https://api.congress.gov/v3/member/${stateCode}`;
    const API_DATA_GOV = process.env.API_DATA_GOV;

    if (!API_DATA_GOV) {
        throw new Error('API_DATA_GOV environment variable is not set');
    }

    try {
        const response = await axios.get(`${API_URL}?format=json&api_key=${API_DATA_GOV}`, {
            headers: { accept: 'application/json' },
            timeout: 15000 // 15 second timeout
        });

        const data = response.data;
        console.log(`Retrieved ${data.members?.length || 0} members for state ${stateCode}`);

        // Cache member data
        if (data.members && Array.isArray(data.members)) {
            const pictureRepository = memberRepository.manager.getRepository(MemberPicture);

            // Create query record for tracking
            const { QueryService, QueryEndpointEnum } = require('../service/query.service');
            const { GovApiQuery } = require('../entity/GovApiQuery');

            const queryService = new QueryService(memberRepository.manager.getRepository(GovApiQuery));
            const queryRecord = await queryService.findOrCreateQuery(
                QueryEndpointEnum.MEMBERS,
                { state: stateCode },
                `state=${stateCode}`,
                data.members.length
            );

            await cacheMemberData(data.members, memberRepository, queryRecord.id, pictureRepository);
        }

        return data;
    } catch (error) {
        handleMemberApiError(error, `state ${stateCode}`);
    }
};

// Search members by state and district
export const fetchMembersByStateDistrict = async (
    stateCode: string,
    district: number,
    memberRepository: Repository<Member>
): Promise<any> => {
    console.log(`Getting members for state: ${stateCode}, district: ${district}`);

    const API_URL = `https://api.congress.gov/v3/member/${stateCode}/${district}`;
    const API_DATA_GOV = process.env.API_DATA_GOV;

    if (!API_DATA_GOV) {
        throw new Error('API_DATA_GOV environment variable is not set');
    }

    try {
        const response = await axios.get(`${API_URL}?format=json&api_key=${API_DATA_GOV}`, {
            headers: { accept: 'application/json' },
            timeout: 15000 // 15 second timeout
        });

        const data = response.data;
        console.log(`Retrieved ${data.members?.length || 0} members for state ${stateCode}, district ${district}`);

        // Cache member data
        if (data.members && Array.isArray(data.members)) {
            const pictureRepository = memberRepository.manager.getRepository(MemberPicture);

            // Create query record for tracking
            const { QueryService, QueryEndpointEnum } = require('../service/query.service');
            const { GovApiQuery } = require('../entity/GovApiQuery');

            const queryService = new QueryService(memberRepository.manager.getRepository(GovApiQuery));
            const queryRecord = await queryService.findOrCreateQuery(
                QueryEndpointEnum.MEMBERS,
                { state: stateCode, district },
                `state=${stateCode}&district=${district}`,
                data.members.length
            );

            await cacheMemberData(data.members, memberRepository, queryRecord.id, pictureRepository);
        }

        return data;
    } catch (error) {
        handleMemberApiError(error, `state ${stateCode}, district ${district}`);
    }
};

// Search members by congress, state, and district
export const fetchMembersByCongressStateDistrict = async (
    congress: number,
    stateCode: string,
    district: number,
    memberRepository: Repository<Member>
): Promise<any> => {
    console.log(`Getting members for congress: ${congress}, state: ${stateCode}, district: ${district}`);

    const API_URL = `https://api.congress.gov/v3/member/congress/${congress}/${stateCode}/${district}`;
    const API_DATA_GOV = process.env.API_DATA_GOV;

    if (!API_DATA_GOV) {
        throw new Error('API_DATA_GOV environment variable is not set');
    }

    try {
        const response = await axios.get(`${API_URL}?format=json&api_key=${API_DATA_GOV}`, {
            headers: { accept: 'application/json' },
            timeout: 15000 // 15 second timeout
        });

        const data = response.data;
        console.log(`Retrieved ${data.members?.length || 0} members for congress ${congress}, state ${stateCode}, district ${district}`);

        // Cache member data
        if (data.members && Array.isArray(data.members)) {
            const pictureRepository = memberRepository.manager.getRepository(MemberPicture);

            // Create query record for tracking
            const { QueryService, QueryEndpointEnum } = require('../service/query.service');
            const { GovApiQuery } = require('../entity/GovApiQuery');

            const queryService = new QueryService(memberRepository.manager.getRepository(GovApiQuery));
            const queryRecord = await queryService.findOrCreateQuery(
                QueryEndpointEnum.MEMBERS,
                { congress, state: stateCode, district },
                `congress=${congress}&state=${stateCode}&district=${district}`,
                data.members.length
            );

            await cacheMemberData(data.members, memberRepository, queryRecord.id, pictureRepository);
        }

        return data;
    } catch (error) {
        handleMemberApiError(error, `congress ${congress}, state ${stateCode}, district ${district}`);
    }
};

// Helper function to cache member data
async function cacheMemberData(members: any[], memberRepository: Repository<Member>, queryId: string, pictureRepository?: Repository<MemberPicture>) {

    for (const raw of members) {
        const memberData = raw.member ?? raw;
        try {
            const transformed: any = {};

            transformed.queryId = queryId;
            transformed.bioguideId = memberData.bioguideId;
            transformed.name = memberData.name ?? memberData.directOrderName ?? 'Unknown';
            transformed.party = memberData.party ?? memberData.partyName ?? 'Unknown';
            transformed.state = memberData.state;
            transformed.district = memberData.district != null ? String(memberData.district) : null;
            transformed.url = memberData.url ?? `https://api.congress.gov/v3/member/${memberData.bioguideId}`;
            transformed.updateDate = new Date(memberData.updateDate);

            // Additional fields from Congress.gov API
            transformed.birthYear = memberData.birthYear;
            transformed.directOrderName = memberData.directOrderName;
            transformed.firstName = memberData.firstName;
            transformed.honorificName = memberData.honorificName;
            transformed.invertedOrderName = memberData.invertedOrderName;
            transformed.lastName = memberData.lastName;

            // Complex objects stored as JSON
            if (memberData.cosponsoredLegislation) {
                transformed.cosponsoredLegislation = {
                    count: memberData.cosponsoredLegislation.count,
                    url: memberData.cosponsoredLegislation.url
                };
            }

            if (memberData.sponsoredLegislation) {
                transformed.sponsoredLegislation = {
                    count: memberData.sponsoredLegislation.count,
                    url: memberData.sponsoredLegislation.url
                };
            }

            if (memberData.leadership && Array.isArray(memberData.leadership)) {
                transformed.leadership = memberData.leadership.map((role: any) => ({
                    congress: role.congress,
                    type: role.type
                }));
            }

            if (memberData.partyHistory && Array.isArray(memberData.partyHistory)) {
                transformed.partyHistory = memberData.partyHistory.map((party: any) => ({
                    partyAbbreviation: party.partyAbbreviation,
                    partyName: party.partyName,
                    startYear: party.startYear
                }));
            }

            if (memberData.terms && Array.isArray(memberData.terms)) {
                transformed.terms = memberData.terms.map((term: any) => ({
                    chamber: term.chamber,
                    congress: term.congress,
                    endYear: term.endYear,
                    memberType: term.memberType,
                    startYear: term.startYear,
                    stateCode: term.stateCode,
                    stateName: term.stateName
                }));
            }

            transformed.depiction = {
                attribution: memberData.depiction?.attribution ?? '',
                imageUrl: memberData.depiction?.imageUrl ?? ''
            };

            // Map service terms to House/Senate served structure
            const served: any = {};
            const items: any[] = Array.isArray(memberData.terms) ? memberData.terms : memberData.terms?.item ?? [];
            for (const term of items) {
                const chamberRaw = String(term.chamber ?? '');
                const chamber = chamberRaw.toLowerCase().includes('senate') ? 'Senate' : 'House';
                const startRaw = term.startYear ?? term.start ?? null;
                const start = startRaw != null ? Number(startRaw) : null;
                const end = term.endYear != null ? Number(term.endYear) : null;

                if (start != null && Number.isFinite(start)) {
                    if (chamber === 'House') {
                        served.House = served.House ?? [];
                        served.House.push({ start, end });
                    } else {
                        served.Senate = served.Senate ?? [];
                        served.Senate.push({ start, end });
                    }
                }
            }
            transformed.served = served;

            // Check if member already exists to avoid unnecessary saves
            const existingMember = await memberRepository.findOneBy({ bioguideId: memberData.bioguideId });

            if (existingMember) {
                // Update existing member only if data has changed significantly
                // For now, we'll update if the updateDate is different or if key fields are missing
                const needsUpdate = !existingMember.birthYear && transformed.birthYear ||
                                  existingMember.updateDate.getTime() !== transformed.updateDate.getTime() ||
                                  existingMember.queryId !== queryId; // Also update if queryId is different

                if (!needsUpdate) {
                    console.log(`Member ${memberData.bioguideId} already cached and up to date`);
                    return;
                }
            }

            const member = plainToClass(Member, transformed);
            await validate(member);

            const savedMember = await memberRepository.save(member);
            console.log(`${existingMember ? 'Updated' : 'Cached'} member: ${member.name} (${member.bioguideId}) with queryId: ${savedMember.queryId}`);

            // Download and store member picture if available
            if (pictureRepository && memberData.depiction?.imageUrl) {
                try {
                    const picture = await downloadAndStoreMemberPicture(
                        memberData.bioguideId,
                        memberData.depiction.imageUrl,
                        memberData.depiction.attribution || '',
                        memberRepository,
                        pictureRepository
                    );

                    if (picture) {
                        // Update member's current picture reference
                        savedMember.currentPicture = picture;
                        await memberRepository.save(savedMember);
                        console.log(`Updated member ${memberData.bioguideId} with picture reference`);
                    }
                } catch (pictureError) {
                    console.warn(`Failed to download picture for ${memberData.bioguideId}:`, pictureError);
                    // Don't fail the entire member caching process if picture download fails
                }
            }

        } catch (validationError) {
            const message = validationError instanceof Error ? validationError.message : 'Validation/Save error';
            console.warn(`Failed to cache member: ${memberData?.bioguideId} - ${message}`);
        }
    }
}

// Helper function to parse query parameters
export function parseQueryParams(queryString: string): Record<string, any> {
    const params: Record<string, any> = {};
    const urlParams = new URLSearchParams(queryString);

    for (const [key, value] of urlParams.entries()) {
        // Try to parse as number, boolean, or keep as string
        if (!isNaN(Number(value))) {
            params[key] = Number(value);
        } else if (value === 'true' || value === 'false') {
            params[key] = value === 'true';
        } else {
            params[key] = value;
        }
    }

    return params;
}

// Helper function to handle API errors
function handleMemberApiError(error: any, context: string) {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
            throw new Error(`No members found for ${context}`);
        }
        if (error.response?.status === 429) {
            throw new Error('API rate limit exceeded. Please try again later.');
        }
        if (error.response?.status === 400) {
            throw new Error(`Invalid parameters for ${context}`);
        }
    }
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error fetching members for ${context}:`, error);
    throw new Error(`Failed to fetch members for ${context}: ${errorMessage}`);
}

// VALID QUERY for this years members
// http://localhost:3000/member?fromDateTime=2023-01-01T00%3A00%3A00Z&toDateTime=2023-05-27T00%3A00%3A00Z
async function fetchMemberData(memberRepository: Repository<Member>, queryParams: string) {
    console.log(`🔍 Checking cache for query: ${queryParams}`);

    // Parse query parameters for cache lookup
    const parsedParams = parseQueryParams(queryParams);

    // Initialize query service for cache checking
    const { QueryService, QueryEndpointEnum } = require('../service/query.service');
    const { GovApiQuery } = require('../entity/GovApiQuery');

    const queryService = new QueryService(memberRepository.manager.getRepository(GovApiQuery));

    // Check if we have a cached query record
    const sortedParsedParams = Object.keys(parsedParams).sort().reduce((sorted, key) => {
        sorted[key] = parsedParams[key];
        return sorted;
    }, {} as Record<string, any>);
    const normalizedParamsStr = JSON.stringify(sortedParsedParams);

    const existingQuery = await queryService.queryRepository.findOne({
        where: {
            endpoint: QueryEndpointEnum.MEMBERS,
            normalizedParams: normalizedParamsStr
        }
    });

    if (existingQuery) {
        console.log(`✅ CACHE HIT: Found existing query record ${existingQuery.id}`);

        // Get members associated with this query
        const cachedMembers = await memberRepository.findBy({ queryId: existingQuery.id });

        console.log(`🔍 API: Found ${cachedMembers.length} cached members for query ID: ${existingQuery.id}`);

        if (cachedMembers.length > 0) {
            console.log(`🚀 RETURNING ${cachedMembers.length} CACHED MEMBERS`);

            // Update hit count
            existingQuery.hitCount += 1;
            existingQuery.lastExecutedAt = new Date();
            await queryService.queryRepository.save(existingQuery);

            // Attach picture data and return
            const pictureRepository = memberRepository.manager.getRepository(MemberPicture);
            const membersWithPictures = await Promise.all(
                cachedMembers.map(async (member) => {
                    const memberResponse = { ...member }; // Create response object
                    try {
                        const currentPicture = await getCurrentMemberPicture(member.bioguideId, pictureRepository);
                        if (currentPicture) {
                            const pictureData = getMemberPictureData(currentPicture);
                            if (pictureData) {
                                (memberResponse as any).currentPicture = {
                                    id: currentPicture.id,
                                    base64Data: pictureData.base64Data,
                                    contentType: pictureData.contentType,
                                    version: currentPicture.version,
                                    isCurrentVersion: currentPicture.isCurrentVersion,
                                    attribution: currentPicture.attribution
                                };
                            }
                        }
                    } catch (pictureError) {
                        console.warn(`Failed to attach picture data for ${member.bioguideId}:`, pictureError);
                    }
                    return memberResponse;
                })
            );

            return { members: membersWithPictures };
        }
    }

    console.log(`❌ CACHE MISS: Making API call for ${queryParams}`);

    const API_URL = `https://api.congress.gov/v3/member?${queryParams}`;
    const API_DATA_GOV = process.env.API_DATA_GOV;

    if (!API_DATA_GOV) {
        throw new Error('API_DATA_GOV environment variable is not set');
    }

    try {
        console.log(`🌐 Fetching for API_URL ${API_URL}`)
        const response = await axios.get(`${API_URL}&api_key=${API_DATA_GOV}`, {
            headers: { accept: 'application/json' },
            timeout: 15000 // 15 second timeout
        });

        const data = response.data;
        console.log(`📥 Got data for ${data.members?.length || 0} members`)

        // Save members data to database with transformation/validation
        if (data.members && Array.isArray(data.members)) {
            const pictureRepository = memberRepository.manager.getRepository(MemberPicture);

            // Extract date range from query params for query tracking
            const dateRange = createDateRange(parsedParams.fromDateTime as string, parsedParams.toDateTime as string);
            const { fromDateTime, toDateTime } = dateRange;

            // Create query record for tracking
            const queryRecord = await queryService.findOrCreateQuery(
                QueryEndpointEnum.MEMBERS,
                parsedParams,
                queryParams,
                data.members.length,
                fromDateTime,
                toDateTime
            );

            await cacheMemberData(data.members, memberRepository, queryRecord.id, pictureRepository);

            // Attach current picture data to the response
            for (const memberWrapper of data.members) {
                const memberData = memberWrapper.member ?? memberWrapper;
                try {
                    const currentPicture = await getCurrentMemberPicture(memberData.bioguideId, pictureRepository);
                    if (currentPicture) {
                        const pictureData = getMemberPictureData(currentPicture);
                        if (pictureData) {
                            memberData.currentPicture = {
                                id: currentPicture.id,
                                base64Data: pictureData.base64Data,
                                contentType: pictureData.contentType,
                                version: currentPicture.version,
                                isCurrentVersion: currentPicture.isCurrentVersion,
                                attribution: currentPicture.attribution
                            };
                        }
                    }
                } catch (pictureError) {
                    console.warn(`Failed to attach picture data for ${memberData.bioguideId}:`, pictureError);
                }
            }
        }

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 429) {
                throw new Error('API rate limit exceeded. Please try again later.');
            }
            if (error.response?.status === 401) {
                throw new Error('Invalid API key. Please check your API_DATA_GOV environment variable.');
            }
        }
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error fetching member data:', error);
        throw new Error(`Failed to fetch member data: ${errorMessage}`);
    }
}