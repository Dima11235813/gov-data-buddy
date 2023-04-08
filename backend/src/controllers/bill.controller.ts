import axios from 'axios';
import { Request, Response } from 'express';
import { getBills } from "../api";
import { AppDataSource } from "../datasource/sqlite-datasource";
import { Bill } from "../entities/Bill";

export namespace BillsController {
    const billRepository = AppDataSource.manager.getRepository(Bill);
    export const getBillsByQuery = async (req: Request, res: Response) => {
        const cachedBills = await billRepository.findBy({ searchQuery: `${req.query}` });
        console.log(`cachedBills: ${cachedBills.length}`)
        if (cachedBills.length > 0) {
            res.json({ bills: cachedBills });
            return;
        } else {
            getBills(req, res, billRepository);
        }
    }
    export const getBillDetails = async (req: Request, res: Response) => {
        const { congress, billType, billNumber } = req.params;

        try {
            const API_URL = `https://api.congress.gov/v3/bill/${congress}/${billType}/${billNumber}`;
            const API_DATA_GOV = process.env.API_DATA_GOV;

            const response = await axios.get(`${API_URL}?format=json&api_key=${API_DATA_GOV}`, {
                headers: { accept: 'application/json' },
            });

            const data = response.data;
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while fetching data from the API.' });
        }
    };
    export const getBillSummary = async (req: Request, res: Response) => {

        const { congress, billType, billNumber } = req.params;
        try {
            const API_URL = `https://api.congress.gov/v3/bill/${congress}/${billType}/${billNumber}/summaries?format=json`
            const API_DATA_GOV = process.env.API_DATA_GOV;

            const response = await axios.get(`${API_URL}?format=json&api_key=${API_DATA_GOV}`, {
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