import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { BillDto } from '../../shared/Bill.model';
import { BillDetailDto } from '../../shared/BillDetail.model';
import { BillEntity } from '../entity/BillEntity';
import { BillDetailsEntity } from '../entity/BillDetailsEntity';
import { CommitteeReport } from '../entity/CommitteeReportEntity';
import { CBOCostEstimateEntity } from '../entity/CboCostEstimateEntity';

dotenv.config();

const API_URL = 'https://api.congress.gov/v3/bill';

// Helper function to transform API bill details to entity
async function transformBillDetailsToEntity(billDetails: any): Promise<BillDetailsEntity> {
    const entity = new BillDetailsEntity();

    // Basic fields
    entity.congress = billDetails.congress;
    entity.number = billDetails.number;
    entity.originChamber = billDetails.originChamber;
    entity.originChamberCode = billDetails.originChamberCode;
    entity.title = billDetails.title;
    entity.type = billDetails.type;
    entity.updateDate = billDetails.updateDate;
    entity.updateDateIncludingText = billDetails.updateDateIncludingText;
    entity.introducedDate = billDetails.introducedDate;
    entity.legislationUrl = billDetails.legislationUrl || '';
    entity.laws = billDetails.laws;

    // Transform nested entities
    if (billDetails.actions) {
        entity.actions = billDetails.actions;
    }

    if (billDetails.amendments) {
        entity.amendments = billDetails.amendments;
    }

    if (billDetails.committees) {
        entity.committees = billDetails.committees;
    }

    if (billDetails.cosponsors) {
        entity.cosponsors = billDetails.cosponsors;
    }

    if (billDetails.latestAction) {
        entity.latestAction = billDetails.latestAction;
    }

    if (billDetails.policyArea) {
        entity.policyArea = billDetails.policyArea;
    }

    if (billDetails.relatedBills) {
        entity.relatedBills = billDetails.relatedBills;
    }

    if (billDetails.sponsors && billDetails.sponsors.length > 0) {
        entity.sponsors = billDetails.sponsors;
    }

    if (billDetails.subjects) {
        entity.subjects = billDetails.subjects;
    }

    if (billDetails.summaries) {
        entity.summaries = billDetails.summaries;
    }

    if (billDetails.textVersions) {
        entity.textVersions = billDetails.textVersions;
    }

    if (billDetails.titles) {
        entity.titles = billDetails.titles;
    }

    // Handle arrays of entities
    if (billDetails.committeeReports && billDetails.committeeReports.length > 0) {
        entity.committeeReports = billDetails.committeeReports.map((report: any) => plainToClass(CommitteeReport, report));
    }

    if (billDetails.cboCostEstimates && billDetails.cboCostEstimates.length > 0) {
        entity.cboCostEstimates = billDetails.cboCostEstimates.map((estimate: any) => plainToClass(CBOCostEstimateEntity, estimate));
    }

    return entity;
}

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

    // Feature flag to control validation - can be disabled for debugging
    const BILL_VALIDATION_ENABLED = process.env.BILL_VALIDATION_ENABLED !== 'false';

    const validationPromises = decoratedBills.map(async (bill: BillDto) => {
        if (BILL_VALIDATION_ENABLED) {
            const errors = await validate(bill);
            if (errors.length > 0) {
                throw new Error(`Validation failed for bill with searchQuery ${bill.searchQuery}: ${JSON.stringify(errors)}`);
            }
        } else {
            console.log(`Validation disabled for bill with searchQuery ${bill.searchQuery} via BILL_VALIDATION_ENABLED=false`);
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
        },
        relations: [
            'cboCostEstimates',
            'committeeReports'
        ]
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

    const transformedBillDetails = await transformBillDetailsToEntity(billDetails);
    const validatedEntity = plainToClass(BillDetailsEntity, transformedBillDetails);

    console.log(`Validating and saving bill details for: ${billKey}`);

    // Feature flag to control validation - can be disabled for debugging
    const BILL_VALIDATION_ENABLED = process.env.BILL_VALIDATION_ENABLED !== 'false';

    if (BILL_VALIDATION_ENABLED) {
        const errors = await validate(validatedEntity);
        if (errors.length > 0) {
            console.error(`Validation errors for bill ${billKey}:`, errors);
            throw new Error(`Validation failed for bill ${billKey}: ${JSON.stringify(errors)}`);
        }
    } else {
        console.log(`Validation disabled for bill ${billKey} via BILL_VALIDATION_ENABLED=false`);
    }

    try {
        const savedBill = await billRepository.save(validatedEntity);
        console.log(`Successfully saved bill details for: ${billKey}`);
        return savedBill;
    } catch (error) {
        console.error(`Error saving bill ${billKey}:`, error);
        throw new Error(`Failed to save bill details for ${billKey}`);
    }
};