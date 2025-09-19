# Member API Integration Documentation

## Overview

This document describes the implementation of the Member API integration for the Government Data Buddy application. The member functionality provides access to congressional member data including biographical information, committee assignments, and legislative activity.

## Architecture

### Backend Components

#### 1. Entity Layer
- **MemberEntity.ts**: Main entity for storing member data
- **DepictionEntity.ts**: Entity for member photo/image information
- **ServedEntity.ts**: Entity for congressional service periods (House/Senate terms)

#### 2. API Layer
- **member.api.ts**: Handles external API communication with Congress.gov
- Provides functions for fetching member lists and individual member details
- Includes error handling, rate limiting, and data validation

#### 3. Controller Layer
- **member.controller.ts**: Express.js controllers for member endpoints
- Handles HTTP requests and responses
- Implements caching strategy (database first, then API)

#### 4. Data Access Layer
- TypeORM repository pattern for database operations
- SQLite database for local caching
- Migration support for schema updates

### Frontend Components

#### 1. Service Layer
- **members.service.ts**: Angular service for API communication
- RxJS observables for reactive data handling
- Error handling and retry logic

#### 2. Component Layer
- **member-directory**: Displays searchable/filterable member list
- **member-profile**: Shows detailed individual member information
- **members-page**: Main container component with routing

#### 3. Routing
- `/members`: Member directory with search and filters
- `/members/:bioguideId`: Individual member profile pages

## API Endpoints

### Backend Endpoints

```
GET /member
```
Fetches members with optional query parameters:
- `format`: Response format (default: 'json')
- `offset`: Pagination offset (default: 0)
- `limit`: Results per page (default: 250)
- `fromDateTime`: Start date filter (ISO format)
- `toDateTime`: End date filter (ISO format)

```
GET /member/:bioguideId
```
Fetches detailed information for a specific member by their bioguide ID.

### External APIs

The backend integrates with:
- **Congress.gov Member API**: `https://api.congress.gov/v3/member`
- Requires API key in `API_DATA_GOV` environment variable
- Rate limited to 1000 requests/hour for free tier

## Database Schema

### Member Table
```sql
CREATE TABLE member (
    id INTEGER PRIMARY KEY,
    searchQuery TEXT,
    bioguideId VARCHAR NOT NULL,
    depiction_id INTEGER,
    district VARCHAR,
    name VARCHAR NOT NULL,
    party VARCHAR NOT NULL,
    served_id INTEGER,
    state VARCHAR NOT NULL,
    updateDate DATETIME,
    url TEXT
);
```

### Depiction Table
```sql
CREATE TABLE depiction (
    id INTEGER PRIMARY KEY,
    attribution TEXT NOT NULL,
    imageUrl TEXT NOT NULL
);
```

### Served Table (Service Periods)
```sql
CREATE TABLE served (
    id INTEGER PRIMARY KEY,
    house_terms JSON,
    senate_terms JSON
);
```

## Environment Configuration

### Required Environment Variables

```bash
API_DATA_GOV=your_congress_gov_api_key_here
NODE_ENV=development|production
```

### Optional Environment Variables

```bash
PORT=3000  # Backend server port
```

## Usage Examples

### Fetching Members

```typescript
// Get all members
GET /member

// Get members with pagination
GET /member?offset=0&limit=50

// Get members with date filter
GET /member?fromDateTime=2023-01-01T00:00:00Z&toDateTime=2023-12-31T23:59:59Z
```

### Getting Member Details

```typescript
// Get specific member
GET /member/P000197  // Nancy Pelosi's bioguide ID
```

### Frontend Service Usage

```typescript
import { MembersService } from './members.service';

constructor(private membersService: MembersService) {}

loadMembers() {
  this.membersService.getMembers().subscribe(data => {
    this.members = data.members;
  });
}

getMemberDetails(bioguideId: string) {
  this.membersService.getMemberById(bioguideId).subscribe(data => {
    this.member = data.member;
  });
}
```

## Error Handling

### HTTP Status Codes

- **200**: Success
- **400**: Bad Request (invalid parameters)
- **404**: Member Not Found
- **429**: API Rate Limit Exceeded
- **500**: Internal Server Error

### Error Response Format

```json
{
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## Caching Strategy

1. **Database First**: Check local database for cached data
2. **API Fallback**: Fetch from Congress.gov API if not cached
3. **Cache Updates**: Store API responses in database for future requests
4. **Cache Invalidation**: Data refreshes on API calls (TTL not implemented)

## Testing

### Unit Tests

```bash
# Run backend tests
npm test

# Run specific test files
npm test member.controller.test.ts
npm test member.api.test.ts
```

### Integration Tests

```bash
# Test with real API (requires API key)
npm run test:integration

# Test with mocks
npm run test:mock
```

### Test Coverage

- Controller endpoints
- API functions
- Error scenarios
- Database operations
- External API integration

## Performance Considerations

### Database Optimization
- Indexes on frequently queried fields (bioguideId, state, party)
- Efficient query patterns for search and filtering
- Connection pooling for multiple requests

### API Optimization
- Request batching for bulk operations
- Response compression
- Caching layer for frequently accessed data
- Rate limiting to respect API constraints

### Frontend Optimization
- Lazy loading of member components
- Virtual scrolling for large member lists
- Debounced search input
- Progressive loading of member details

## Monitoring and Logging

### Application Logs
- API request/response logging
- Database operation logging
- Error tracking and alerting
- Performance metrics collection

### External API Monitoring
- Rate limit tracking
- API response time monitoring
- Error rate monitoring
- Cache hit/miss ratios

## Deployment Considerations

### Environment Setup
1. Configure API keys in environment variables
2. Set up database migrations
3. Configure reverse proxy for API routing
4. Set up monitoring and logging

### Scaling Considerations
- Database connection pooling
- API request queuing for rate limits
- Caching layer for high-traffic scenarios
- Horizontal scaling with load balancer

## Future Enhancements

### Planned Features
- Advanced search with fuzzy matching
- Member comparison functionality
- Legislative activity timeline
- Committee membership visualization
- Social media integration
- Contact information management

### Technical Improvements
- GraphQL API for flexible queries
- Redis caching layer
- Elasticsearch for full-text search
- Real-time data synchronization
- Advanced analytics and reporting
