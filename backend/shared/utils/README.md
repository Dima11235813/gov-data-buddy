# Date Utilities

This module provides centralized date formatting and parsing utilities for the GovData Buddy application.

## Overview

The date utilities help ensure consistent date handling across the application, particularly for API parameters and database operations. They handle various date formats and provide robust parsing that can deal with malformed date strings.

## Key Features

- **Robust Date Parsing**: Handles multiple date formats including ISO strings, date-only formats, and malformed strings
- **Consistent Formatting**: Provides standardized ISO format output
- **Date Range Operations**: Utilities for creating and validating date ranges
- **Date Manipulation**: Functions for adding/subtracting days, getting start/end of day
- **Error Handling**: Graceful error handling with descriptive error messages

## Usage

### Basic Date Parsing

```typescript
import { parseDate, formatToISOString } from '../../shared/utils/date-utils';

// Parse various date formats
const date1 = parseDate('2024-09-19T00:00:00Z');  // ISO format
const date2 = parseDate('2024-09-19');             // Date only
const date3 = parseDate('2024-09-19T00:00Z');      // ISO without seconds

// Format dates consistently
const isoString = formatToISOString(new Date());
```

### API Date Parameters

```typescript
import { parseDateParams, createDateRange } from '../../shared/utils/date-utils';

// Parse query parameters
const params = parseDateParams(req.query);

// Create date range from strings
const dateRange = createDateRange(fromDateTime, toDateTime);
```

### Date Manipulation

```typescript
import { addDays, startOfDay, endOfDay, isSameDay } from '../../shared/utils/date-utils';

// Add/subtract days
const futureDate = addDays(new Date(), 7);
const pastDate = addDays(new Date(), -7);

// Get day boundaries
const dayStart = startOfDay(new Date());
const dayEnd = endOfDay(new Date());

// Compare dates
const sameDay = isSameDay(date1, date2);
```

## API Reference

### Core Functions

#### `parseDate(dateString: string): Date`
Parses a date string into a Date object. Handles multiple formats:
- ISO format: `2024-09-19T00:00:00Z`
- ISO without seconds: `2024-09-19T00:00Z`
- Date only: `2024-09-19`
- Malformed strings with timezone info

#### `formatToISOString(date: Date): string`
Formats a Date object to ISO string format.

#### `formatToDateString(date: Date): string`
Formats a Date object to date-only ISO string (YYYY-MM-DD).

### Parameter Parsing

#### `parseDateParams(params: Record<string, any>): ParsedDateParams`
Parses date parameters from query objects or request parameters.

#### `createDateRange(fromDateTime?: string, toDateTime?: string): DateRange`
Creates a date range object from date strings.

#### `validateDateRange(dateRange: DateRange): boolean`
Validates that a date range is logical (from <= to).

### Date Manipulation

#### `addDays(date: Date, days: number): Date`
Adds or subtracts days from a date.

#### `startOfDay(date: Date): Date`
Gets the start of day (00:00:00) for a given date.

#### `endOfDay(date: Date): Date`
Gets the end of day (23:59:59.999) for a given date.

#### `isSameDay(date1: Date, date2: Date): boolean`
Checks if two dates are on the same day.

### Utilities

#### `now(): Date`
Gets the current date/time in UTC.

#### `nowISOString(): string`
Gets the current date/time formatted as ISO string.

## Error Handling

All functions include proper error handling:

- `parseDate()` throws descriptive errors for invalid date strings
- Format functions validate input dates
- Parameter parsing functions handle missing or invalid parameters gracefully

## Testing

The utilities include comprehensive test coverage. Run tests with:

```bash
npm test -- date-utils.test.ts
```

## Migration Guide

When migrating existing code to use these utilities:

1. Replace `new Date(dateString)` with `parseDate(dateString)`
2. Replace `date.toISOString()` with `formatToISOString(date)` for consistency
3. Use `startOfDay()` instead of manual date manipulation for date-only operations
4. Use `parseDateParams()` for parsing API parameters
5. Use `createDateRange()` for creating date range objects

## Examples

### Before (scattered date handling)
```typescript
// In member.api.ts
const fromDateTime = parsedParams.fromDateTime ? new Date(parsedParams.fromDateTime as string) : undefined;

// In query.service.ts
if (dateFrom) query.dateFrom = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate());
```

### After (centralized date handling)
```typescript
// In member.api.ts
const dateRange = createDateRange(parsedParams.fromDateTime as string, parsedParams.toDateTime as string);
const { fromDateTime, toDateTime } = dateRange;

// In query.service.ts
if (dateFrom) query.dateFrom = startOfDay(dateFrom);
```
