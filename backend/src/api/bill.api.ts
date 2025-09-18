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
    const parsedBillNumber = parseInt(billParams.billNumber, 10) ?? 0
    const { API_DATA_GOV } = process.env;
    const { congress, billType, billNumber } = billParams;
    // TODO Decide if we want to do anything with the bill key - since a bill number might be sufficient to save - TODO Research these bill numbers and if they're reused between congress numbers 
    const billKey = `${congress}-${billType}-${billNumber}`;
    console.log(`Billkey ${billKey}`)
    const existingData = await billRepository.findOneBy({ id: parsedBillNumber });

    if (existingData) {
        console.log(`Returning bill details from database: ${billKey}`);
        return existingData;
    } else {
        console.log(`Fetching bill details from API...`);
    }

    const API_URL = `https://api.congress.gov/v3/bill/${congress}/${billType}/${billNumber}`;
    const response = await axios.get(`${API_URL}?format=json&api_key=${API_DATA_GOV}`, {
        headers: { accept: 'application/json' },
    });

    const billDetails = response.data.bill;
    console.log(`Response from api`)
    console.log(response.data)
    const decoratedBillDetails = plainToClass(BillDetailsEntity, {
        ...billDetails,
        id: billNumber,
    });
    console.log(`Decorated bill details`)
    console.log(decoratedBillDetails)

    const errors = await validate(decoratedBillDetails);
    if (errors.length > 0) {
        throw new Error(`Validation failed for bill ${billNumber}: ${JSON.stringify(errors)}`);
    }
    try {
        await billRepository.save(decoratedBillDetails);
    } catch (e) {
        console.log(`Error in saving bill id ${billNumber}`)
        console.warn(e)
    }
    return decoratedBillDetails;
};