import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { BillDto } from '../shared/Bill.model';
import { Bill } from './entities/Bill';

dotenv.config();

const API_URL = 'https://api.congress.gov/v3/bill';

const fetchData = async (billRepository: Repository<BillDto>, queryParams: string) => {
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

    const bills: BillDto[] = response.data.bills
    const decoratedBills = bills.map((b: BillDto) => plainToClass(Bill, {
        ...b,
        searchQuery: queryParams,
    }))

    const validationPromises = decoratedBills.map(async (bill: BillDto) => {
        const errors = await validate(bill);
        if (errors.length > 0) {
            throw new Error(`Validation failed for bill with searchQuery ${bill.searchQuery}: ${JSON.stringify(errors)}`);
        }
    });

    await Promise.all(validationPromises);
    await billRepository.save(decoratedBills);
    return bills;
};

export const getBills = async (req: Request, res: Response, billRepository: Repository<BillDto>) => {
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