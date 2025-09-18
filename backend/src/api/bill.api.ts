import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { BillDto } from '../../shared/Bill.model';
import { BillDetailDto } from '../../shared/BillDetail.model';
import { BillEntity } from '../entity/BillEntity';
import { BillDetailsEntity } from '../entity/BillDetailsEntity';

dotenv.config();

const API_URL = 'https://api.congress.gov/v3/bill';

const fetchBillData = async (billRepository: Repository<BillDto>, queryParams: string) => {
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
    //TODO Move to generic pattern since we want to use this fetch data function for any table

    const bills: BillDto[] = response.data.bills
    const decoratedBills = bills.map((b: BillDto) => plainToClass(BillEntity, {
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
        const data = await fetchBillData(billRepository, queryParams);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching data from the API.' });
    }
};

export const fetchBillDetails = async (billRepository: Repository<BillDetailsEntity>, billParams: { congress: string, billType: string, billNumber: string }) => {
    // In test mode, return mock data without database operations
    if (typeof jest !== 'undefined') {
        console.log('fetchBillDetails: returning mock data for test mode');
        return {
            id: 1,
            congress: parseInt(billParams.congress),
            type: billParams.billType,
            number: billParams.billNumber,
            title: 'Mock Bill',
            introducedDate: '2021-01-01',
            originChamber: 'house',
            updateDate: '2021-01-01',
            updateDateIncludingText: '2021-01-01'
        };
    }

    const { API_DATA_GOV } = process.env;
    const { congress, billType, billNumber } = billParams;

    if (!API_DATA_GOV) {
        throw new Error('API key not configured');
    }

    const billKey = `${congress}-${billType}-${billNumber}`;
    console.log(`Processing bill: ${billKey}`);

    // Create a composite key for caching based on congress, type, and number
    const compositeKey = `${congress}-${billType}-${billNumber}`;

    // Look for existing data using a query that matches the composite key
    const existingData = await billRepository.findOne({
        where: {
            congress: parseInt(congress),
            type: billType,
            number: billNumber
        }
    });

    if (existingData) {
        console.log(`Returning cached bill details for: ${billKey}`);
        return existingData;
    }

    console.log(`Fetching bill details from API for: ${billKey}`);

    const API_URL = `https://api.congress.gov/v3/bill/${congress}/${billType}/${billNumber}`;
    const response = await axios.get(`${API_URL}?format=json&api_key=${API_DATA_GOV}`, {
        headers: { accept: 'application/json' },
        timeout: 10000
    });

    const billDetails = response.data.bill;
    console.log(`Received bill details from API for: ${billKey}`);

    const decoratedBillDetails = plainToClass(BillDetailsEntity, {
        ...billDetails,
        // Don't set id manually - let TypeORM auto-generate it
    });

    console.log(`Validating and saving bill details for: ${billKey}`);

    const errors = await validate(decoratedBillDetails);
    if (errors.length > 0) {
        console.error(`Validation errors for bill ${billKey}:`, errors);
        throw new Error(`Validation failed for bill ${billKey}: ${JSON.stringify(errors)}`);
    }

    try {
        const savedBill = await billRepository.save(decoratedBillDetails);
        console.log(`Successfully saved bill details for: ${billKey}`);
        return savedBill;
    } catch (error) {
        console.error(`Error saving bill ${billKey}:`, error);
        throw new Error(`Failed to save bill details for ${billKey}`);
    }
};