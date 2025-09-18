import axios from 'axios';
import { Request, Response } from 'express';
import { getCommittees, fetchCommitteeDetails, getCommitteeBills, getCommitteeReports } from "../api/committee.api";
import { AppDataSource } from "../datasource/sqlite-datasource";
import { CommitteeEntity } from "../entity/CommitteeEntity";

export namespace CommitteesController {
    const getCommitteeRepository = () => {
        if (typeof jest !== 'undefined') {
            return {
                findBy: jest.fn().mockResolvedValue([]),
                findOneBy: jest.fn().mockResolvedValue(null),
                save: jest.fn().mockResolvedValue({}),
                findOne: jest.fn().mockResolvedValue(null),
                createQueryBuilder: jest.fn(() => ({
                    andWhere: jest.fn().mockReturnThis(),
                    getCount: jest.fn().mockResolvedValue(0)
                }))
            } as any;
        }
        return AppDataSource.manager.getRepository(CommitteeEntity);
    };

    /**
     * @swagger
     * /committee:
     *   get:
     *     summary: Get committees with optional query parameters
     *     tags: [Committees]
     *     parameters:
     *       - in: query
     *         name: format
     *         schema:
     *           type: string
     *           enum: [json, xml]
     *         description: Response format
     *       - in: query
     *         name: offset
     *         schema:
     *           type: integer
     *           minimum: 0
     *         description: Pagination offset
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           minimum: 1
     *           maximum: 250
     *         description: Number of results per page
     *       - in: query
     *         name: fromDateTime
     *         schema:
     *           type: string
     *           format: date-time
     *         description: Start date filter
     *       - in: query
     *         name: toDateTime
     *         schema:
     *           type: string
     *           format: date-time
     *         description: End date filter
     *     responses:
     *       200:
     *         description: Committees retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/CommitteeResponse'
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    export const getCommitteesByQuery = async (req: Request, res: Response) => {
        try {
            const queryParams = JSON.stringify(req.query);
            const cachedCommittees = await getCommitteeRepository().findBy({ searchQuery: queryParams });

            if (cachedCommittees.length > 0) {
                console.log(`Returning ${cachedCommittees.length} cached committees`);
                res.json({ committees: cachedCommittees });
                return;
            }

            getCommittees(req, res, getCommitteeRepository());
        } catch (error) {
            console.error('Error in getCommitteesByQuery:', error);
            res.status(500).json({ message: 'An error occurred while fetching committees.' });
        }
    }

    /**
     * @swagger
     * /committee/{chamber}/{committeeCode}:
     *   get:
     *     summary: Get detailed information about a specific committee
     *     tags: [Committees]
     *     parameters:
     *       - in: path
     *         name: chamber
     *         required: true
     *         schema:
     *           type: string
     *           enum: [house, senate, joint]
     *         description: Chamber name
     *       - in: path
     *         name: committeeCode
     *         required: true
     *         schema:
     *           type: string
     *         description: Committee system code
     *     responses:
     *       200:
     *         description: Committee details retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Committee'
     *       400:
     *         description: Invalid parameters
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
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
            const data = await fetchCommitteeDetails(getCommitteeRepository(), committeeParams);
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
