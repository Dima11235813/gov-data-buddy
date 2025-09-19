import { Request, Response } from 'express';
import { getMembers, fetchMemberDetailsFromAPI } from "../api/member.api";
import { AppDataSource } from "../datasource/sqlite-datasource";
import { Member } from "../entity/MemberEntity";

export namespace MembersController {
    const memberRepository = AppDataSource.manager.getRepository(Member);

    export const getMembersByQuery = async (req: Request, res: Response) => {
        console.log(`getMembersByQuery`)
        const { format = 'json', offset = 0, limit = 250, fromDateTime, toDateTime } = req.query;
        console.log(`Query:`)
        console.log(req.query)
        let cachedMembers: Member[] = []
        try {

            cachedMembers = await memberRepository.findBy({ searchQuery: `${req.query}` });
            console.log(`cachedMembers: ${cachedMembers.length}`)
        } catch (e) {
            console.log(e)
            console.warn(`No members table exists yet.`)
        }

        if (cachedMembers.length > 0) {
            res.json({ members: cachedMembers });
            return;
        } else {
            // TODO Test the get members by query feature - set up strong type for membersQueryParams
            getMembers(req, res, memberRepository, { format, offset, limit, fromDateTime, toDateTime } as any);
        }
    }

    export const getMemberDetails = async (req: Request, res: Response) => {
        const { bioguideId } = req.params;

        try {
            // Try to get from database first (cache)
            let cachedMember: Member | null = null;
            try {
                cachedMember = await memberRepository.findOneBy({ bioguideId });
            } catch (dbError) {
                console.warn('Database query failed, falling back to API:', dbError);
            }

            if (cachedMember) {
                console.log(`Returning cached member: ${bioguideId}`);
                res.json({ member: cachedMember });
                return;
            }

            // If not in cache, fetch from API
            const data = await fetchMemberDetailsFromAPI(bioguideId, memberRepository);
            res.json(data);

        } catch (error) {
            console.error(`Error fetching member ${bioguideId}:`, error);

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

            res.status(statusCode).json({
                message,
                error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
            });
        }
    }
}
