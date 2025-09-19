/**
 * Date utility functions for consistent date formatting and parsing
 * Centralizes date handling logic used throughout the application
 */

export interface DateRange {
    fromDateTime?: Date;
    toDateTime?: Date;
}

export interface ParsedDateParams extends DateRange {
    format: string;
    offset: number;
    limit: number;
}

/**
 * Parses various date string formats into a standardized Date object
 * Handles multiple input formats and ensures consistent output
 */
export function parseDate(dateString: string): Date {
    if (!dateString || typeof dateString !== 'string') {
        throw new Error(`Invalid date string: ${dateString}`);
    }

    // Handle ISO format (YYYY-MM-DDTHH:mm:ssZ)
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z?$/.test(dateString)) {
        return new Date(dateString);
    }

    // Handle ISO format without seconds (YYYY-MM-DDTHH:mmZ)
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z?$/.test(dateString)) {
        return new Date(dateString);
    }

    // Handle date-only format (YYYY-MM-DD)
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return new Date(dateString + 'T00:00:00Z');
    }

    // Handle malformed date strings that might have timezone info mixed in
    // e.g., "Mon Sep 09 2024 00:00:00 GMT-0500 (Central Daylight Time)T00:00:00Z"
    const isoMatch = dateString.match(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z?)/);
    if (isoMatch) {
        return new Date(isoMatch[1]);
    }

    // Handle specific malformed format with timezone suffix
    // e.g., "Mon Sep 09 2024 00:00:00 GMT-0500 (Central Daylight Time)T00:00:00Z"
    // Extract the date part and reconstruct as ISO
    const malformedMatch = dateString.match(/(\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2}) GMT[+-]\d{4}.*T(\d{2}:\d{2}:\d{2})Z/);
    if (malformedMatch) {
        // Parse the human-readable date and time parts
        const datePart = new Date(malformedMatch[1]);
        const timePart = malformedMatch[2];
        // Create ISO string from parsed components
        const year = datePart.getFullYear();
        const month = String(datePart.getMonth() + 1).padStart(2, '0');
        const day = String(datePart.getDate()).padStart(2, '0');
        return new Date(`${year}-${month}-${day}T${timePart}Z`);
    }

    // Try to parse as standard date string
    const parsed = new Date(dateString);
    if (isNaN(parsed.getTime())) {
        throw new Error(`Unable to parse date: ${dateString}`);
    }

    return parsed;
}

/**
 * Formats a Date object to ISO string format (YYYY-MM-DDTHH:mm:ssZ)
 */
export function formatToISOString(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error(`Invalid Date object: ${date}`);
    }

    return date.toISOString();
}

/**
 * Formats a Date object to date-only ISO string (YYYY-MM-DD)
 */
export function formatToDateString(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error(`Invalid Date object: ${date}`);
    }

    return date.toISOString().split('T')[0];
}

/**
 * Parses date parameters from query strings or objects
 * Handles fromDateTime and toDateTime parameters
 */
export function parseDateParams(params: Record<string, any>): ParsedDateParams {
    const result: ParsedDateParams = {
        format: params.format || 'json',
        offset: parseInt(params.offset?.toString() || '0', 10),
        limit: parseInt(params.limit?.toString() || '12', 10)
    };

    if (params.fromDateTime) {
        try {
            result.fromDateTime = parseDate(params.fromDateTime);
        } catch (error) {
            console.warn(`Failed to parse fromDateTime: ${params.fromDateTime}`, error);
        }
    }

    if (params.toDateTime) {
        try {
            result.toDateTime = parseDate(params.toDateTime);
        } catch (error) {
            console.warn(`Failed to parse toDateTime: ${params.toDateTime}`, error);
        }
    }

    return result;
}

/**
 * Creates a date range object from date parameters
 */
export function createDateRange(fromDateTime?: string, toDateTime?: string): DateRange {
    const result: DateRange = {};

    if (fromDateTime) {
        try {
            result.fromDateTime = parseDate(fromDateTime);
        } catch (error) {
            console.warn(`Failed to parse fromDateTime: ${fromDateTime}`, error);
        }
    }

    if (toDateTime) {
        try {
            result.toDateTime = parseDate(toDateTime);
        } catch (error) {
            console.warn(`Failed to parse toDateTime: ${toDateTime}`, error);
        }
    }

    return result;
}

/**
 * Validates that a date range is logical (from <= to)
 */
export function validateDateRange(dateRange: DateRange): boolean {
    if (!dateRange.fromDateTime || !dateRange.toDateTime) {
        return true; // If either is missing, consider it valid
    }

    return dateRange.fromDateTime.getTime() <= dateRange.toDateTime.getTime();
}

/**
 * Gets the current date/time in UTC
 */
export function now(): Date {
    return new Date();
}

/**
 * Gets the current date/time formatted as ISO string
 */
export function nowISOString(): string {
    return now().toISOString();
}

/**
 * Adds days to a date
 */
export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * Subtracts days from a date
 */
export function subtractDays(date: Date, days: number): Date {
    return addDays(date, -days);
}

/**
 * Gets the start of day (00:00:00) for a given date in UTC
 */
export function startOfDay(date: Date): Date {
    const result = new Date(date);
    result.setUTCHours(0, 0, 0, 0);
    return result;
}

/**
 * Gets the end of day (23:59:59.999) for a given date in UTC
 */
export function endOfDay(date: Date): Date {
    const result = new Date(date);
    result.setUTCHours(23, 59, 59, 999);
    return result;
}

/**
 * Checks if two dates are on the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}
