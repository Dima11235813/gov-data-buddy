import axios from 'axios';
import { Request, Response } from 'express';
import { getCommittees, fetchCommitteeDetails, getCommitteeBills, getCommitteeReports } from "../api/committee.api";
import { AppDataSource } from "../datasource/sqlite-datasource";
import { CommitteeEntity } from "../entity/CommitteeEntity";

export namespace CommitteesController {
    const committeeRepository = AppDataSource.manager.getRepository(CommitteeEntity);

    export const getCommitteesByQuery = async (req: Request, res: Response) => {
        try {
            const queryParams = JSON.stringify(req.query);
            const cachedCommittees = await committeeRepository.findBy({ searchQuery: queryParams });

            if (cachedCommittees.length > 0) {
                console.log(`Returning ${cachedCommittees.length} cached committees`);
                res.json({ committees: cachedCommittees });
                return;
            }

            getCommittees(req, res, committeeRepository);
        } catch (error) {
            console.error('Error in getCommitteesByQuery:', error);
            res.status(500).json({ message: 'An error occurred while fetching committees.' });
        }
    }

    export const getCommitteeDetails = async (req: Request, res: Response) => {
        const { chamber, congress, committeeCode } = req.params;

        // Input validation
        if (!committeeCode) {
            return res.status(400).json({ message: 'Missing required parameter: committeeCode' });
        }

        if (congress && isNaN(parseInt(congress))) {
            return res.status(400).json({ message: 'Congress must be a valid number' });
        }

        try {
            const committeeParams = {
                chamber,
                congress,
                committeeCode
            };

            console.log(`Fetching committee details for ${committeeCode}`);
            const data = await fetchCommitteeDetails(committeeRepository, committeeParams);
            res.json(data);
        } catch (error) {
            console.error('Error in getCommitteeDetails:', error);
            res.status(500).json({ message: 'An error occurred while fetching committee details.' });
        }
    };

    export const getCommitteeBills = async (req: Request, res: Response) => {
        const { chamber, committeeCode } = req.params;

        // Input validation
        if (!chamber || !committeeCode) {
            return res.status(400).json({ message: 'Missing required parameters: chamber, committeeCode' });
        }

        try {
            await getCommitteeBills(req, res);
        } catch (error) {
            console.error('Error in getCommitteeBills:', error);
            res.status(500).json({ message: 'An error occurred while fetching committee bills.' });
        }
    };

    export const getCommitteeReports = async (req: Request, res: Response) => {
        const { chamber, committeeCode } = req.params;

        // Input validation
        if (!chamber || !committeeCode) {
            return res.status(400).json({ message: 'Missing required parameters: chamber, committeeCode' });
        }

        try {
            await getCommitteeReports(req, res);
        } catch (error) {
            console.error('Error in getCommitteeReports:', error);
            res.status(500).json({ message: 'An error occurred while fetching committee reports.' });
        }
    };

    export const getCommitteeCommunications = async (req: Request, res: Response) => {
        const { chamber, committeeCode } = req.params;
        const { API_DATA_GOV } = process.env;

        // Input validation
        if (!chamber || !committeeCode) {
            return res.status(400).json({ message: 'Missing required parameters: chamber, committeeCode' });
        }

        if (!API_DATA_GOV) {
            return res.status(500).json({ message: 'API key not configured' });
        }

        try {
            const API_URL = `https://api.congress.gov/v3/committee/${chamber}/${committeeCode}/house-communication`;
            const queryParams = new URLSearchParams(req.query as any).toString();

            console.log(`Fetching committee communications for ${chamber}/${committeeCode}`);
            const response = await axios.get(`${API_URL}?${queryParams}&format=json&api_key=${API_DATA_GOV}`, {
                headers: { accept: 'application/json' },
                timeout: 10000
            });

            res.json(response.data);
        } catch (error) {
            console.error('Error in getCommitteeCommunications:', error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    return res.status(404).json({ message: 'Committee communications not found' });
                }
                if (error.response?.status === 429) {
                    return res.status(429).json({ message: 'API rate limit exceeded' });
                }
            }

            res.status(500).json({ message: 'An error occurred while fetching committee communications.' });
        }
    };

    export const getCommitteeNominations = async (req: Request, res: Response) => {
        const { committeeCode } = req.params;
        const { API_DATA_GOV } = process.env;

        // Input validation
        if (!committeeCode) {
            return res.status(400).json({ message: 'Missing required parameter: committeeCode' });
        }

        if (!API_DATA_GOV) {
            return res.status(500).json({ message: 'API key not configured' });
        }

        try {
            const API_URL = `https://api.congress.gov/v3/committee/senate/${committeeCode}/nominations`;
            const queryParams = new URLSearchParams(req.query as any).toString();

            console.log(`Fetching committee nominations for senate/${committeeCode}`);
            const response = await axios.get(`${API_URL}?${queryParams}&format=json&api_key=${API_DATA_GOV}`, {
                headers: { accept: 'application/json' },
                timeout: 10000
            });

            res.json(response.data);
        } catch (error) {
            console.error('Error in getCommitteeNominations:', error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    return res.status(404).json({ message: 'Committee nominations not found' });
                }
                if (error.response?.status === 429) {
                    return res.status(429).json({ message: 'API rate limit exceeded' });
                }
            }

            res.status(500).json({ message: 'An error occurred while fetching committee nominations.' });
        }
    };
}
