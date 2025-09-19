import {
    parseDate,
    formatToISOString,
    formatToDateString,
    parseDateParams,
    createDateRange,
    validateDateRange,
    now,
    nowISOString,
    addDays,
    startOfDay,
    endOfDay,
    isSameDay
} from '../date-utils';

describe('Date Utils', () => {
    describe('parseDate', () => {
        test('should parse ISO format dates', () => {
            const date = parseDate('2024-09-19T00:00:00Z');
            expect(date.toISOString()).toBe('2024-09-19T00:00:00.000Z');
        });

        test('should parse ISO format without seconds', () => {
            const date = parseDate('2024-09-19T00:00Z');
            expect(date.toISOString()).toBe('2024-09-19T00:00:00.000Z');
        });

        test('should parse date-only format', () => {
            const date = parseDate('2024-09-19');
            expect(date.toISOString()).toBe('2024-09-19T00:00:00.000Z');
        });

        test('should handle malformed date strings with timezone', () => {
            // Test the specific case from the error
            const date = parseDate('Mon Sep 09 2024 00:00:00 GMT-0500 (Central Daylight Time)T00:00:00Z');
            expect(date.toISOString()).toMatch(/^2024-09-09T\d{2}:\d{2}:\d{2}/);
        });

        test('should throw error for invalid date strings', () => {
            expect(() => parseDate('invalid-date')).toThrow();
        });
    });

    describe('formatToISOString', () => {
        test('should format date to ISO string', () => {
            const date = new Date('2024-09-19T12:30:45Z');
            const result = formatToISOString(date);
            expect(result).toBe('2024-09-19T12:30:45.000Z');
        });

        test('should throw error for invalid date', () => {
            expect(() => formatToISOString(new Date('invalid'))).toThrow();
        });
    });

    describe('formatToDateString', () => {
        test('should format date to date-only string', () => {
            const date = new Date('2024-09-19T12:30:45Z');
            const result = formatToDateString(date);
            expect(result).toBe('2024-09-19');
        });
    });

    describe('parseDateParams', () => {
        test('should parse date parameters correctly', () => {
            const params = {
                format: 'json',
                offset: '10',
                limit: '20',
                fromDateTime: '2024-09-19T00:00:00Z',
                toDateTime: '2024-09-20T23:59:59Z'
            };

            const result = parseDateParams(params);
            expect(result.format).toBe('json');
            expect(result.offset).toBe(10);
            expect(result.limit).toBe(20);
            expect(result.fromDateTime?.toISOString()).toBe('2024-09-19T00:00:00.000Z');
            expect(result.toDateTime?.toISOString()).toBe('2024-09-20T23:59:59.000Z');
        });
    });

    describe('createDateRange', () => {
        test('should create date range object', () => {
            const result = createDateRange('2024-09-19T00:00:00Z', '2024-09-20T23:59:59Z');
            expect(result.fromDateTime?.toISOString()).toBe('2024-09-19T00:00:00.000Z');
            expect(result.toDateTime?.toISOString()).toBe('2024-09-20T23:59:59.000Z');
        });
    });

    describe('validateDateRange', () => {
        test('should validate correct date range', () => {
            const range = {
                fromDateTime: new Date('2024-09-19'),
                toDateTime: new Date('2024-09-20')
            };
            expect(validateDateRange(range)).toBe(true);
        });

        test('should invalidate incorrect date range', () => {
            const range = {
                fromDateTime: new Date('2024-09-20'),
                toDateTime: new Date('2024-09-19')
            };
            expect(validateDateRange(range)).toBe(false);
        });
    });

    describe('addDays', () => {
        test('should add days to date', () => {
            const date = new Date('2024-09-19');
            const result = addDays(date, 3);
            expect(result.toISOString()).toBe('2024-09-22T00:00:00.000Z');
        });

        test('should subtract days from date', () => {
            const date = new Date('2024-09-19');
            const result = addDays(date, -3);
            expect(result.toISOString()).toBe('2024-09-16T00:00:00.000Z');
        });
    });

    describe('startOfDay', () => {
        test('should get start of day', () => {
            const date = new Date('2024-09-19T12:30:45Z');
            const result = startOfDay(date);
            expect(result.toISOString()).toBe('2024-09-19T00:00:00.000Z');
        });
    });

    describe('endOfDay', () => {
        test('should get end of day', () => {
            const date = new Date('2024-09-19T12:30:45Z');
            const result = endOfDay(date);
            expect(result.toISOString()).toBe('2024-09-19T23:59:59.999Z');
        });
    });

    describe('isSameDay', () => {
        test('should identify same day', () => {
            const date1 = new Date('2024-09-19T12:30:45Z');
            const date2 = new Date('2024-09-19T15:45:30Z');
            expect(isSameDay(date1, date2)).toBe(true);
        });

        test('should identify different days', () => {
            const date1 = new Date('2024-09-19T12:30:45Z');
            const date2 = new Date('2024-09-20T15:45:30Z');
            expect(isSameDay(date1, date2)).toBe(false);
        });
    });
});
