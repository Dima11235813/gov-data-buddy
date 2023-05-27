import axios from 'axios';
import { Request, Response } from 'express';
import { getMembers } from "../api/member.api";
import { AppDataSource } from "../datasource/sqlite-datasource";
import { Member } from "../entities/Member";

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
        const { format = 'json' } = req.query;

        try {
            // TODO move endpoint into dotenv
            const API_URL = `https://api.congress.gov/v3/member/${bioguideId}`;
            const API_DATA_GOV = process.env.API_DATA_GOV;

            const response = await axios.get(`${API_URL}?format=${format}&api_key=${API_DATA_GOV}`, {
                headers: { accept: 'application/json' },
            });

            const data = response.data;
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching data from the API.' });
        }
    }
}
