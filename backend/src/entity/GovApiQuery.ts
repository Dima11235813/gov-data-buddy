import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('gov_api_queries')
@Index(['endpoint', 'normalizedParams'], { unique: true })
export class GovApiQuery {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        comment: 'The API endpoint this query targets'
    })
    endpoint: string;

    @Column({
        type: 'text',
        comment: 'Normalized query parameters as JSON string'
    })
    normalizedParams: string;

    @Column({
        type: 'text',
        comment: 'Original query string for debugging'
    })
    originalQuery: string;

    @Column({
        type: 'int',
        default: 0,
        comment: 'Number of results returned by this query'
    })
    resultCount: number;

    @Column({
        type: 'datetime',
        nullable: true,
        comment: 'Start date range for time-based queries'
    })
    dateFrom?: Date;

    @Column({
        type: 'datetime',
        nullable: true,
        comment: 'End date range for time-based queries'
    })
    dateTo?: Date;

    @Column({
        type: 'int',
        default: 0,
        comment: 'Number of times this query has been executed'
    })
    hitCount: number;

    @Column({
        type: 'datetime',
        nullable: true,
        comment: 'Last time this query was executed'
    })
    lastExecutedAt?: Date;

    @CreateDateColumn({
        type: 'datetime',
        comment: 'When this query was first recorded'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'datetime',
        comment: 'When this query was last updated'
    })
    updatedAt: Date;

    /**
     * Check if this query overlaps with the given date range
     */
    overlapsWithDateRange(fromDate?: Date, toDate?: Date): boolean {
        if (!fromDate || !toDate || !this.dateFrom || !this.dateTo) {
            return false;
        }

        // Convert input dates to date-only format for comparison
        const inputFrom = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
        const inputTo = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());

        // Check for overlap: query ranges overlap if start1 <= end2 && start2 <= end1
        return inputFrom <= this.dateTo && this.dateFrom <= inputTo;
    }

    /**
     * Calculate what portion of the requested range is missing from this cached query
     */
    getMissingRanges(fromDate: Date, toDate: Date): { from: Date; to: Date }[] {
        if (!this.dateFrom || !this.dateTo) {
            return [{ from: fromDate, to: toDate }];
        }

        // Convert input dates to date-only format for comparison
        const inputFrom = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
        const inputTo = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());

        const missingRanges: { from: Date; to: Date }[] = [];

        // Gap before cached range
        if (inputFrom < this.dateFrom) {
            const gapEnd = new Date(Math.min(this.dateFrom.getTime(), inputTo.getTime()));
            if (inputFrom < gapEnd) {
                missingRanges.push({
                    from: inputFrom,
                    to: gapEnd
                });
            }
        }

        // Gap after cached range
        if (inputTo > this.dateTo) {
            const gapStart = new Date(Math.max(this.dateFrom.getTime(), inputFrom.getTime()));
            if (gapStart < inputTo) {
                missingRanges.push({
                    from: gapStart,
                    to: inputTo
                });
            }
        }

        return missingRanges;
    }
}
