import axios from 'axios';
// TODO Follow similar pattern here as with Bill
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Member } from '../entity/MemberEntity';

export const getMembers = async (
    req: Request,
    res: Response,
    memberRepository: Repository<Member>,
    params: { format: string; offset: number; limit: number; fromDateTime: string; toDateTime: string; }
) => {
    console.log(`Getting members from api gov!`)
    const queryParams = new URLSearchParams({
        format: params.format,
        offset: params.offset.toString(),
        limit: params.limit.toString(),
        fromDateTime: params.fromDateTime,
        toDateTime: params.toDateTime
    }).toString();

    console.log(`\nQuery params: ${JSON.stringify(queryParams)}`);

    try {
        const data = await fetchMemberData(memberRepository, queryParams);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching data from the API.' });
    }
};

// VALID QUERY for this years members
// http://localhost:3000/member?fromDateTime=2023-01-01T00%3A00%3A00Z&toDateTime=2023-05-27T00%3A00%3A00Z
async function fetchMemberData(memberRepository: Repository<Member>, queryParams: string) {
    const API_URL = `https://api.congress.gov/v3/member?${queryParams}`;
    console.log(`Fetching for API_URL ${API_URL}`)
    const API_DATA_GOV = process.env.API_DATA_GOV;

    const response = await axios.get(`${API_URL}&api_key=${API_DATA_GOV}`, {
        headers: { accept: 'application/json' },
    });

    const data = response.data;
    console.log(`Got data for members`)
    console.log(data)

    // Save members data to database
    for (const member of data.members) {
        await memberRepository.save(member);
    }

    return data;
}