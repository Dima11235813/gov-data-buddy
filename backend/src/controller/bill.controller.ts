import axios from 'axios';
import { Request, Response } from 'express';
import { fetchBillDetails, getBills } from "../api/bill.api";
import { AppDataSource } from "../datasource/sqlite-datasource";
import { BillEntity } from "../entity/BillEntity";
import { BillDetailsEntity } from '../entity/BillDetailsEntity';

export namespace BillsController {
    const billRepository = AppDataSource.manager.getRepository(BillEntity);

    export const getBillsByQuery = async (req: Request, res: Response) => {
        try {
            const cachedBills = await billRepository.findBy({ searchQuery: JSON.stringify(req.query) });

            if (cachedBills.length > 0) {
                console.log(`Returning ${cachedBills.length} cached bills`);
                res.json({ bills: cachedBills });
                return;
            }

            getBills(req, res, billRepository);
        } catch (error) {
            console.error('Error in getBillsByQuery:', error);
            res.status(500).json({ message: 'An error occurred while fetching bills.' });
        }
    }

    export const getBillDetails = async (req: Request, res: Response) => {
        const { congress, billType, billNumber } = req.params;

        // Input validation
        if (!congress || !billType || !billNumber) {
            return res.status(400).json({ message: 'Missing required parameters: congress, billType, billNumber' });
        }

        if (isNaN(parseInt(congress))) {
            return res.status(400).json({ message: 'Congress must be a valid number' });
        }

        const billDetailRepository = AppDataSource.manager.getRepository(BillDetailsEntity);

        try {
            console.log(`Fetching bill details for ${congress}/${billType}/${billNumber}`);
            const data = await fetchBillDetails(billDetailRepository, { congress, billType, billNumber });
            res.json(data);
        } catch (error) {
            console.error('Error in getBillDetails:', error);
            res.status(500).json({ message: 'An error occurred while fetching bill details.' });
        }
    };

    export const getBillSummary = async (req: Request, res: Response) => {
        const { congress, billType, billNumber } = req.params;

        // Input validation
        if (!congress || !billType || !billNumber) {
            return res.status(400).json({ message: 'Missing required parameters: congress, billType, billNumber' });
        }

        try {
            const API_URL = `https://api.congress.gov/v3/bill/${congress}/${billType}/${billNumber}/summaries`;
            const API_DATA_GOV = process.env.API_DATA_GOV;

            if (!API_DATA_GOV) {
                return res.status(500).json({ message: 'API key not configured' });
            }

            console.log(`Fetching bill summary for ${congress}/${billType}/${billNumber}`);
            const response = await axios.get(`${API_URL}?format=json&api_key=${API_DATA_GOV}`, {
                headers: { accept: 'application/json' },
                timeout: 10000 // 10 second timeout
            });

            res.json(response.data);
        } catch (error) {
            console.error('Error in getBillSummary:', error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    return res.status(404).json({ message: 'Bill summary not found' });
                }
                if (error.response?.status === 429) {
                    return res.status(429).json({ message: 'API rate limit exceeded' });
                }
            }

            res.status(500).json({ message: 'An error occurred while fetching bill summary.' });
        }
    }
};