import { Repository } from 'typeorm';
import { GovApiQuery } from '../entity/GovApiQuery';
import { startOfDay } from '../../shared/utils/date-utils';

// Query endpoint constants (since SQLite doesn't support enums)
export const QueryEndpointEnum = {
    MEMBERS: 'members',
    MEMBER_DETAIL: 'member_detail',
    BILLS: 'bills',
    BILL_DETAIL: 'bill_detail',
    COMMITTEES: 'committees',
    COMMITTEE_DETAIL: 'committee_detail'
} as const;

export type QueryEndpointType = typeof QueryEndpointEnum[keyof typeof QueryEndpointEnum];

export class QueryService {
    constructor(private queryRepository: Repository<GovApiQuery>) {}

    /**
     * Create or find existing query record
     */
    async findOrCreateQuery(
        endpoint: QueryEndpointType,
        normalizedParams: Record<string, any>,
        originalQuery: string,
        resultCount: number,
        dateFrom?: Date,
        dateTo?: Date
    ): Promise<GovApiQuery> {
        const normalizedParamsStr = JSON.stringify(this.sortObjectKeys(normalizedParams));

        // Try to find existing query
        let query = await this.queryRepository.findOne({
            where: {
                endpoint,
                normalizedParams: normalizedParamsStr
            }
        });

        if (query) {
            // Update existing query
            query.hitCount += 1;
            query.lastExecutedAt = new Date();
            query.resultCount = Math.max(query.resultCount, resultCount);
            if (dateFrom) query.dateFrom = startOfDay(dateFrom);
            if (dateTo) query.dateTo = startOfDay(dateTo);
            return await this.queryRepository.save(query);
        }

        // Create new query
        query = new GovApiQuery();
        query.endpoint = endpoint;
        query.normalizedParams = normalizedParamsStr;
        query.originalQuery = originalQuery;
        query.resultCount = resultCount;
        query.hitCount = 1;
        query.lastExecutedAt = new Date();
        if (dateFrom) query.dateFrom = startOfDay(dateFrom);
        if (dateTo) query.dateTo = startOfDay(dateTo);

        return await this.queryRepository.save(query);
    }

    /**
     * Find queries that overlap with the given date range
     */
    async findOverlappingQueries(
        endpoint: QueryEndpointType,
        dateFrom: Date,
        dateTo: Date
    ): Promise<GovApiQuery[]> {
        const queries = await this.queryRepository.find({
            where: { endpoint },
            order: { createdAt: 'DESC' }
        });

        return queries.filter(query => query.overlapsWithDateRange(dateFrom, dateTo));
    }

    /**
     * Get missing date ranges for incremental fetching
     */
    getMissingDateRanges(
        existingQueries: GovApiQuery[],
        requestedFrom: Date,
        requestedTo: Date
    ): { from: Date; to: Date }[] {
        if (existingQueries.length === 0) {
            return [{ from: requestedFrom, to: requestedTo }];
        }

        // Find the union of all existing date ranges
        const existingRanges = existingQueries
            .filter(q => q.dateFrom && q.dateTo)
            .map(q => ({ from: q.dateFrom!, to: q.dateTo! }))
            .sort((a, b) => a.from.getTime() - b.from.getTime());

        // Merge overlapping ranges
        const mergedRanges = this.mergeDateRanges(existingRanges);

        // Find gaps in the merged ranges
        const missingRanges: { from: Date; to: Date }[] = [];

        let currentStart = requestedFrom;

        for (const range of mergedRanges) {
            if (currentStart < range.from) {
                missingRanges.push({ from: currentStart, to: range.from });
            }
            currentStart = new Date(Math.max(currentStart.getTime(), range.to.getTime()));
        }

        // Add any remaining gap at the end
        if (currentStart < requestedTo) {
            missingRanges.push({ from: currentStart, to: requestedTo });
        }

        return missingRanges;
    }

    /**
     * Merge overlapping date ranges
     */
    private mergeDateRanges(ranges: { from: Date; to: Date }[]): { from: Date; to: Date }[] {
        if (ranges.length === 0) return [];

        const sorted = ranges.sort((a, b) => a.from.getTime() - b.from.getTime());
        const merged: { from: Date; to: Date }[] = [sorted[0]];

        for (let i = 1; i < sorted.length; i++) {
            const current = sorted[i];
            const last = merged[merged.length - 1];

            if (current.from <= last.to) {
                // Overlapping or adjacent ranges
                last.to = new Date(Math.max(last.to.getTime(), current.to.getTime()));
            } else {
                // No overlap
                merged.push(current);
            }
        }

        return merged;
    }

    /**
     * Sort object keys for consistent normalization
     */
    private sortObjectKeys(obj: Record<string, any>): Record<string, any> {
        const sorted: Record<string, any> = {};
        Object.keys(obj).sort().forEach(key => {
            sorted[key] = obj[key];
        });
        return sorted;
    }
}