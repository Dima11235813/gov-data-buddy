# Task: Swagger/OpenAPI Documentation Integration

## Overview
Implement comprehensive Swagger/OpenAPI documentation for the Government Data Buddy backend API to enable easy testing, exploration, and integration of all endpoints including the newly implemented committee functionality.

## Background
The backend now supports comprehensive bill and committee operations, but lacks interactive API documentation. Swagger UI will provide a user-friendly interface for testing endpoints, viewing request/response schemas, and understanding API capabilities without requiring separate tools like Postman or curl.

## Requirements

### 1. Swagger/OpenAPI Setup
- [ ] Install and configure Swagger/OpenAPI packages for Express.js
- [ ] Create OpenAPI 3.0 specification document
- [ ] Set up Swagger UI middleware for interactive documentation
- [ ] Configure proper server endpoint for documentation access

### 2. API Documentation Structure
Create comprehensive documentation for all endpoints:

#### Bills Endpoints
- [ ] `GET /bill` - List bills with query parameters
- [ ] `GET /bill/{congress}/{billType}/{billNumber}` - Get bill details
- [ ] `GET /bill/{congress}/{billType}/{billNumber}/summaries` - Get bill summaries

#### Committee Endpoints
- [ ] `GET /committee` - List committees
- [ ] `GET /committee/{congress}/{chamber}` - List committees by congress/chamber
- [ ] `GET /committee/{chamber}` - List committees by chamber
- [ ] `GET /committee/{chamber}/{committeeCode}` - Get committee details
- [ ] `GET /committee/{congress}/{chamber}/{committeeCode}` - Get committee details by congress
- [ ] `GET /committee/{chamber}/{committeeCode}/bills` - Get committee bills
- [ ] `GET /committee/{chamber}/{committeeCode}/reports` - Get committee reports
- [ ] `GET /committee/{chamber}/{committeeCode}/house-communication` - Get house communications
- [ ] `GET /committee/senate/{committeeCode}/nominations` - Get senate nominations

#### Member Endpoints
- [ ] `GET /member` - List members with query parameters
- [ ] `GET /member/{bioguideId}` - Get member details

### 3. Schema Definitions
Define comprehensive OpenAPI schemas for:

#### Core Models
- [ ] **Bill**: Complete bill schema with all properties
- [ ] **BillDetail**: Extended bill details with relationships
- [ ] **Committee**: Committee information schema
- [ ] **Member**: Member information schema
- [ ] **CommitteeReport**: Committee report schema
- [ ] **Nomination**: Nomination schema

#### Request/Response Models
- [ ] **BillsResponse**: Paginated bills list response
- [ ] **CommitteeResponse**: Committee list response
- [ ] **MembersResponse**: Members list response
- [ ] **ErrorResponse**: Standardized error response format

### 4. Parameter Documentation
Document all query and path parameters:

#### Query Parameters
- [ ] `format` (string): Data format (json/xml)
- [ ] `offset` (integer): Pagination offset (default: 0)
- [ ] `limit` (integer): Records per page (default: 250, max: 250)
- [ ] `fromDateTime` (string): Start date filter (YYYY-MM-DDTHH:mm:ssZ)
- [ ] `toDateTime` (string): End date filter (YYYY-MM-DDTHH:mm:ssZ)

#### Path Parameters
- [ ] `congress` (integer): Congress number (e.g., 117)
- [ ] `billType` (string): Bill type (hr, s, hjres, etc.)
- [ ] `billNumber` (string): Bill number
- [ ] `chamber` (string): house, senate, or joint
- [ ] `committeeCode` (string): Committee system code (e.g., hspw00)
- [ ] `bioguideId` (string): Member bioguide identifier

### 5. Response Examples
Provide realistic examples for all endpoints:

#### Success Responses
- [ ] 200 OK with sample data for each endpoint
- [ ] Proper pagination metadata
- [ ] Realistic data structures

#### Error Responses
- [ ] 400 Bad Request: Invalid parameters
- [ ] 404 Not Found: Resource not found
- [ ] 429 Too Many Requests: Rate limit exceeded
- [ ] 500 Internal Server Error: Server errors

### 6. Interactive Features
Configure Swagger UI for enhanced usability:

#### Authentication
- [ ] API key input field for Congress.gov API
- [ ] Instructions for obtaining API key
- [ ] Automatic header injection for authenticated requests

#### Testing Interface
- [ ] Try it out functionality for all endpoints
- [ ] Request/response examples
- [ ] Parameter validation feedback
- [ ] Response formatting options

#### Documentation Features
- [ ] Model schemas with expandable properties
- [ ] Endpoint descriptions and use cases
- [ ] Parameter explanations and constraints
- [ ] Response schema documentation

### 7. Integration with Development Workflow
- [ ] Auto-generation of OpenAPI spec from code (future enhancement)
- [ ] Development vs production documentation environments
- [ ] CI/CD integration for documentation validation
- [ ] Automated documentation updates on deployment

### 8. Accessibility and Usability
- [ ] Mobile-responsive Swagger UI
- [ ] Dark/light theme support
- [ ] Search functionality for endpoints
- [ ] Bookmarkable URLs for specific endpoints
- [ ] Print-friendly documentation

## Technical Implementation Details

### Package Dependencies
```json
{
  "swagger-jsdoc": "^6.2.8",
  "swagger-ui-express": "^5.0.0",
  "@types/swagger-jsdoc": "^6.0.1",
  "@types/swagger-ui-express": "^4.1.3"
}
```

### Configuration Structure
```typescript
// swagger.config.ts
export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Government Data Buddy API',
      version: '1.0.0',
      description: 'Congress.gov API integration with caching and enhanced features'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Development server' },
      { url: 'https://api.govdatabuddy.com', description: 'Production server' }
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key'
        }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};
```

### Server Integration
```typescript
// server.ts
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.config';

// Swagger documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log('Swagger UI available at: http://localhost:3000/api-docs');
```

## Acceptance Criteria
- [ ] Swagger UI accessible at `/api-docs` endpoint
- [ ] All API endpoints documented with proper schemas
- [ ] Interactive testing works for all endpoints
- [ ] Request/response examples provided
- [ ] Parameter validation documented
- [ ] Error responses documented
- [ ] API key authentication configured
- [ ] Mobile-responsive interface
- [ ] Documentation matches actual API behavior

## Dependencies
- Backend API endpoints implemented (completed)
- Express.js server running (completed)
- API key configuration available

## Estimated Effort
- Swagger setup and configuration: 4 hours
- Bills endpoint documentation: 3 hours
- Committee endpoint documentation: 4 hours
- Member endpoint documentation: 2 hours
- Schema definitions and examples: 3 hours
- Testing and validation: 2 hours
- UI customization and optimization: 2 hours

**Total: ~20 hours**

## Testing Strategy
- [ ] Manual testing of all documented endpoints
- [ ] Validation of request/response examples
- [ ] Cross-browser compatibility testing
- [ ] Mobile responsiveness verification
- [ ] API key authentication testing

## Related Files
- `backend/src/swagger.config.ts` (new)
- `backend/src/server.ts` (update)
- `backend/package.json` (update)
- `docs/api-documentation.md` (new)

## Future Enhancements
- Auto-generation from TypeScript decorators
- Integration with API versioning
- Automated testing integration
- Performance monitoring integration
- Client SDK generation
