import axios from 'axios';
import { Request, Response } from 'express';
import { Database } from 'sqlite';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'https://api.congress.gov/v3/bill';

const fetchData = async (db: Database, queryParams: string) => {
    const { API_DATA_GOV } = process.env;

    const existingData = await db.get('SELECT data FROM bills WHERE searchQuery = ?', queryParams);

    if (existingData) {
        console.log(`Returning from database: ${queryParams}`)
        return JSON.parse(existingData.data);
    }else{
        console.log(`Fetching data from API... with query params: ${queryParams}`)
    }

    const response = await axios.get(`${API_URL}?${queryParams}&api_key=${API_DATA_GOV}`, {
        headers: { accept: 'application/json' },
    });

    const data = response.data;

    await db.run('INSERT INTO bills (searchQuery, data) VALUES (?, ?)', queryParams, JSON.stringify(data));

    return data;
};

export const getBills = async (req: Request, res: Response, db: Database) => {
    const queryParams = new URLSearchParams(req.query as any).toString();
    console.log(`
    Query params: ${JSON.stringify(queryParams)}`)

    try {
        const data = await fetchData(db, queryParams);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching data from the API.' });
    }
};