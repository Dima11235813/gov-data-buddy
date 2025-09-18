# Government Data Buddy - Enterprise Architecture Overview

## Project Vision

Government Data Buddy is a comprehensive web application that provides user-friendly access to U.S. Congressional data through the Congress.gov API. The application serves as a bridge between complex government APIs and end-users, offering cached, performant access to legislative information.

## Current Architecture Assessment

### Backend (Node.js/TypeScript)

**Current State:**
- Express.js server with TypeORM ORM
- SQLite database with 14 entities (Bills, Members, Actions, etc.)
- Basic caching layer (database-first, API-fallback)
- Mixed architectural patterns
- Controllers handle both API calls and database operations

**Issues Identified:**
- No domain-driven design (DDD) implementation
- Lack of CQRS pattern for read-heavy operations
- Controllers violate Single Responsibility Principle
- No proper error handling or logging framework
- Missing validation and sanitization layers
- No API versioning strategy
- Database schema management is basic

### Frontend (Angular)

**Current State:**
- Angular 12+ application with Material Design
- Basic component structure
- Services directly calling backend APIs
- No state management solution
- Components contain business logic

**Issues Identified:**
- No NgRx for state management
- Missing view models and selectors
- Components handle data transformation
- No proper error boundaries
- Missing lazy loading and code splitting

## Target Enterprise Architecture

### Backend Architecture (Domain-Driven Design + CQRS)

```
src/
├── domain/           # Domain layer
│   ├── entities/     # Domain entities
│   ├── value-objects/# Value objects
│   ├── services/     # Domain services
│   └── repositories/ # Repository interfaces
├── application/      # Application layer
│   ├── commands/     # Write operations (CQRS Commands)
│   ├── queries/      # Read operations (CQRS Queries)
│   ├── handlers/     # Command/Query handlers
│   └── dtos/         # Data Transfer Objects
├── infrastructure/   # Infrastructure layer
│   ├── api/          # External API clients
│   ├── persistence/  # Database implementations
│   ├── cache/        # Caching layer
│   └── config/       # Configuration
├── presentation/     # Presentation layer
│   ├── controllers/  # REST API controllers
│   ├── middleware/   # Express middleware
│   └── routes/       # Route definitions
└── shared/           # Shared kernel
    ├── errors/       # Error handling
    ├── logging/      # Logging framework
    └── utils/        # Utilities
```

### Frontend Architecture (NgRx + Feature Modules)

```
src/app/
├── core/             # Core module (singleton services)
│   ├── services/     # App-wide services
│   ├── guards/       # Route guards
│   └── interceptors/ # HTTP interceptors
├── shared/           # Shared module
│   ├── components/   # Reusable components
│   ├── pipes/        # Custom pipes
│   ├── directives/   # Custom directives
│   └── utils/        # Shared utilities
├── features/         # Feature modules
│   ├── bills/        # Bills feature
│   │   ├── components/
│   │   ├── containers/
│   │   ├── store/    # NgRx store
│   │   └── models/
│   └── members/      # Members feature
├── store/            # Global NgRx store
│   ├── actions/      # Global actions
│   ├── reducers/     # Global reducers
│   ├── selectors/    # Global selectors
│   └── state/        # Global state
└── view-models/      # View model services
```

## Key Architectural Patterns

### 1. Domain-Driven Design (DDD)
- **Entities**: Bills, Members, Committees, etc.
- **Value Objects**: Addresses, Dates, Status enums
- **Domain Services**: Business logic that spans multiple entities
- **Repositories**: Abstract data access interfaces

### 2. Command Query Responsibility Segregation (CQRS)
- **Commands**: Write operations (CreateBill, UpdateMember)
- **Queries**: Read operations (GetBillsByCongress, SearchMembers)
- **Separate models**: Write models vs. Read models
- **Event sourcing**: For audit trails and data consistency

### 3. Hexagonal Architecture
- **Ports**: Interfaces for external dependencies
- **Adapters**: Implementations of ports (API clients, DB adapters)
- **Dependency Inversion**: Business logic doesn't depend on frameworks

### 4. NgRx State Management
- **Actions**: Describe state changes
- **Reducers**: Pure functions that handle state transitions
- **Selectors**: Computed state derived from store
- **Effects**: Handle side effects (API calls)

## Technology Stack

### Backend
- **Framework**: NestJS (migration from Express)
- **ORM**: TypeORM with custom repositories
- **Database**: PostgreSQL (migration from SQLite for production)
- **Cache**: Redis for query caching
- **API Gateway**: Express middleware with validation
- **Testing**: Jest + Supertest
- **Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: Angular 15+
- **State Management**: NgRx 15+
- **UI Library**: Angular Material
- **Forms**: Reactive Forms with validation
- **HTTP Client**: Angular HttpClient with interceptors
- **Testing**: Jasmine + Karma
- **Build**: Angular CLI with custom webpack

## Data Flow Architecture

### Read Operations (CQRS Query)
1. HTTP Request → Controller → Query → Query Handler
2. Handler → Repository → Cache Check → Database/API
3. Data → DTO Transformation → Response

### Write Operations (CQRS Command)
1. HTTP Request → Controller → Command Validation → Command
2. Command → Command Handler → Domain Service
3. Service → Repository → Database → Event Publishing
4. Success/Failure → Response

## Caching Strategy

### Multi-Level Caching
1. **Browser Cache**: HTTP caching headers
2. **CDN Cache**: Static assets
3. **Application Cache**: Redis for API responses
4. **Database Cache**: Query result caching

### Cache Invalidation
- Time-based expiration
- Event-driven invalidation
- Manual cache clearing endpoints

## Security Considerations

### API Security
- Rate limiting per endpoint
- API key validation
- Request sanitization
- CORS configuration
- Input validation with class-validator

### Data Security
- SQL injection prevention (ORM)
- XSS protection
- Sensitive data encryption
- Audit logging

## Performance Optimizations

### Backend
- Database query optimization
- Connection pooling
- Response compression
- Pagination for large datasets
- Background job processing

### Frontend
- Lazy loading modules
- On-demand component loading
- Virtual scrolling for lists
- Image optimization
- Bundle splitting

## Deployment Architecture

### Development
- Local development with hot reload
- Docker containers for services
- Local database instances

### Staging
- AWS/GCP environment
- CI/CD pipeline
- Automated testing
- Performance monitoring

### Production
- Container orchestration (Kubernetes)
- Load balancing
- Database clustering
- CDN integration
- Monitoring and alerting

## Monitoring and Observability

### Application Metrics
- Response times
- Error rates
- Cache hit ratios
- Database performance

### Business Metrics
- API usage patterns
- User engagement
- Data freshness
- Search effectiveness

### Infrastructure Monitoring
- Server health
- Database connections
- Memory/CPU usage
- Network performance
