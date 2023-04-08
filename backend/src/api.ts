import axios from 'axios';
import { Request, Response } from 'express';
import { Database } from 'sqlite';
import dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { Bill } from './entities/Bill';
import { LatestAction } from './entities/LatestAction';
import { plainToClass } from 'class-transformer';
import { IBill } from '../shared/Bill.model';
import { validate } from 'class-validator';

dotenv.config();

const API_URL = 'https://api.congress.gov/v3/bill';

const fetchData = async (billRepository: Repository<Bill>, queryParams: string) => {
    const { API_DATA_GOV } = process.env;

    const existingData = await billRepository.findBy({ searchQuery: queryParams });

    if (existingData.length > 0) {
        console.log(`Returning from database: ${queryParams}`);
        return existingData;
    } else {
        console.log(`Fetching data from API... with query params: ${queryParams}`);
    }

    const response = await axios.get(`${API_URL}?${queryParams}&api_key=${API_DATA_GOV}`, {
        headers: { accept: 'application/json' },
    });

    const bills: IBill[] = response.data.bills
    const decoratedBills = bills.map((b: IBill) => plainToClass(Bill, {
        ...b,
        searchQuery: queryParams,
    }))

    const validationPromises = decoratedBills.map(async (bill: Bill) => {
        const errors = await validate(bill);
        if (errors.length > 0) {
            throw new Error(`Validation failed for bill with searchQuery ${bill.searchQuery}: ${JSON.stringify(errors)}`);
        }
    });

    await Promise.all(validationPromises);
    await billRepository.save(decoratedBills);
    return bills;
};

export const getBills = async (req: Request, res: Response, billRepository: Repository<Bill>) => {
    const queryParams = new URLSearchParams(req.query as any).toString();
    console.log(`\nQuery params: ${JSON.stringify(queryParams)}`);

    try {
        const data = await fetchData(billRepository, queryParams);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching data from the API.' });
    }
};