import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Member } from '../entity/MemberEntity';

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
        res.json(data);
    } catch (error) {
        console.error('Error fetching members:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({
            message: 'An error occurred while fetching data from the API.',
            error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
        });
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
                await memberRepository.save(data.member);
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

// VALID QUERY for this years members
// http://localhost:3000/member?fromDateTime=2023-01-01T00%3A00%3A00Z&toDateTime=2023-05-27T00%3A00%3A00Z
async function fetchMemberData(memberRepository: Repository<Member>, queryParams: string) {
    const API_URL = `https://api.congress.gov/v3/member?${queryParams}`;
    console.log(`Fetching for API_URL ${API_URL}`)
    const API_DATA_GOV = process.env.API_DATA_GOV;

    if (!API_DATA_GOV) {
        throw new Error('API_DATA_GOV environment variable is not set');
    }

    try {
        const response = await axios.get(`${API_URL}&api_key=${API_DATA_GOV}`, {
            headers: { accept: 'application/json' },
            timeout: 15000 // 15 second timeout
        });

        const data = response.data;
        console.log(`Got data for ${data.members?.length || 0} members`)

        // Save members data to database with transformation/validation
        if (data.members && Array.isArray(data.members)) {
            for (const raw of data.members) {
                const memberData = raw.member ?? raw;
                try {
                    const transformed: any = {};

                    transformed.searchQuery = queryParams; // cache key
                    transformed.bioguideId = memberData.bioguideId;
                    transformed.name = memberData.name;
                    transformed.party = memberData.party ?? memberData.partyName ?? 'Unknown';
                    transformed.state = memberData.state;
                    transformed.district = memberData.district != null ? String(memberData.district) : null;
                    transformed.url = memberData.url;
                    transformed.updateDate = new Date(memberData.updateDate);

                    transformed.depiction = {
                        attribution: memberData.depiction?.attribution ?? '',
                        imageUrl: memberData.depiction?.imageUrl ?? ''
                    };

                    // Map service terms to House/Senate served structure
                    const served: any = {};
                    const items: any[] = memberData.terms?.item ?? [];
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
                        } else {
                            // Ensure arrays exist to satisfy embedded object shape
                            if (chamber === 'House') served.House = served.House ?? [];
                            else served.Senate = served.Senate ?? [];
                        }
                    }
                    transformed.served = served;

                    const member = plainToClass(Member, transformed);
                    await validate(member);

                    await memberRepository.save(member);
                    console.log(`Saved member: ${member.name} (${member.bioguideId})`);
                } catch (validationError) {
                    const message = validationError instanceof Error ? validationError.message : 'Validation/Save error';
                    console.warn(`Failed to save member: ${memberData?.bioguideId} - ${message}`);
                    console.warn('Member data:', memberData);
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