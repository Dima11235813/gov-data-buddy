# Government Data Buddy

A comprehensive web application providing user-friendly access to U.S. Congressional data through the Congress.gov API, featuring enterprise-grade architecture with domain-driven design, CQRS patterns, and advanced caching.

## 🚀 Project Overview

Government Data Buddy serves as a bridge between complex government APIs and end-users, offering:
- **Cached Performance**: Intelligent caching reduces API calls and improves response times
- **Enterprise Architecture**: Domain-driven design with CQRS for scalability
- **Modern Frontend**: Angular with NgRx state management
- **Robust Backend**: NestJS with comprehensive error handling and logging

## 📁 Project Structure

```
gov-data-buddy/
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── domain/         # Domain layer (DDD)
│   │   ├── application/    # Application layer (CQRS)
│   │   ├── infrastructure/ # Infrastructure layer
│   │   └── presentation/   # Presentation layer
│   └── frontend/           # Angular application
├── proj-mgmt/              # Project management docs
│   ├── epics/             # Major deliverables
│   ├── features/          # Functional capabilities
│   ├── stories/           # User requirements
│   ├── tasks/             # Implementation steps
│   └── docs/              # Technical documentation
└── docs/                   # Project documentation
```

## 🏗️ Architecture

### Backend Architecture
- **Framework**: NestJS (migrating from Express.js)
- **Pattern**: Domain-Driven Design + CQRS
- **Database**: PostgreSQL with TypeORM
- **Cache**: Redis for performance optimization
- **Documentation**: Swagger/OpenAPI

### Frontend Architecture
- **Framework**: Angular 15+
- **State Management**: NgRx Store
- **UI Library**: Angular Material
- **Forms**: Reactive Forms with validation
- **Build**: Angular CLI with code splitting

## ✨ Key Features

### 🔍 Comprehensive Data Access
- **Bills Database**: Complete legislation tracking with summaries and details
- **Committee Explorer**: Full committee information including subcommittees and history ✨ **NEW**
- **Member Directory**: Congressional member information and biographies
- **Real-time Updates**: Live data from Congress.gov API with intelligent caching

### 🚀 Performance & Reliability
- **Smart Caching**: Database caching reduces API calls by up to 90%
- **Error Handling**: Comprehensive error handling with specific HTTP status codes
- **Input Validation**: Robust parameter validation and sanitization
- **Rate Limiting**: Built-in protection against API rate limits

### 🛠️ Developer Experience
- **Interactive API Docs**: Swagger UI for easy endpoint testing and exploration
- **Unit Testing**: Jest framework with 47%+ coverage baseline
- **TypeScript**: Full type safety throughout the application
- **Hot Reload**: Development server with instant updates

### 📊 Enterprise Architecture
- **Domain-Driven Design**: Clean architecture with proper separation of concerns
- **CQRS Pattern**: Optimized read/write operations (planned)
- **TypeORM Integration**: Modern database operations with migrations
- **Modular Structure**: Scalable codebase with clear boundaries

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (for production)
- Redis (for caching)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

### Frontend Setup
```bash
cd backend/frontend
npm install
ng serve
```

## 📚 Documentation

### 📖 Getting Started
- **[Architecture Overview](./proj-mgmt/docs/architecture-overview.md)** - Complete technical architecture
- **[Project Management](./proj-mgmt/README.md)** - Development process and structure
- **[Testing Guide](./docs/testing-guide.md)** - Unit testing and E2E testing strategies

### 🔌 API Documentation
- **[Congress.gov API Reference](./docs/data/chat-gpt-5-parse-api-docs/)** - Original API documentation
- **[Backend API Details](./backend/README.md)** - Implementation specifics
- **[Interactive API Docs](http://localhost:3000/api-docs)** - Live Swagger documentation

### 🎯 Development Tasks
- **[Task 006: Frontend Committee Integration](./proj-mgmt/tasks/task-006-001-frontend-committee-integration.md)** - Angular components for committees
- **[Task 007: Backend Unit Testing](./proj-mgmt/tasks/task-007-001-backend-unit-testing-implementation.md)** - Testing implementation plan
- **[Task 008: Swagger Integration](./proj-mgmt/tasks/task-008-001-swagger-api-documentation-integration.md)** - API documentation setup

### 🚀 Key Epics
- **[Epic 001: Backend Modernization](./proj-mgmt/epics/epic-001-backend-architecture-modernization.md)** - DDD + CQRS implementation
- **[Epic 002: Frontend State Management](./proj-mgmt/epics/epic-002-frontend-state-management.md)** - NgRx implementation
- **[Epic 003: Caching Layer](./proj-mgmt/epics/epic-003-caching-persistence-layer.md)** - Performance optimization

### 🧪 Quality Assurance
- **[Frontend Testing](./backend/frontend/README.md)** - Angular testing guide
- **[Backend Testing](./docs/testing-guide.md#backend-testing)** - Jest testing patterns

## 🔧 Development

### Code Quality
- **Linting**: ESLint + Prettier
- **Testing**: Jest (backend) + Jasmine/Karma (frontend)
- **Coverage**: >80% target
- **CI/CD**: GitHub Actions

### Branch Strategy
- `main`: Production-ready code
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Critical fixes

## 🧪 API Testing & Development

### Interactive API Documentation
Test all endpoints with our comprehensive Swagger/OpenAPI documentation:
- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs) (when backend is running)
- **Interactive Testing**: Try endpoints directly from the browser
- **Request/Response Examples**: Real data samples for all operations

### Available Endpoints

#### Bills API
- `GET /bill` - Search and filter bills
- `GET /bill/{congress}/{billType}/{billNumber}` - Get detailed bill information
- `GET /bill/{congress}/{billType}/{billNumber}/summaries` - Get bill summaries

#### Committees API ✨ **NEW**
- `GET /committee` - List all congressional committees
- `GET /committee/{chamber}` - Filter by chamber (house/senate/joint)
- `GET /committee/{congress}/{chamber}` - Filter by congress and chamber
- `GET /committee/{chamber}/{committeeCode}` - Get detailed committee info
- `GET /committee/{chamber}/{committeeCode}/bills` - Get committee's bills
- `GET /committee/{chamber}/{committeeCode}/reports` - Get committee reports
- `GET /committee/{chamber}/{committeeCode}/house-communication` - House communications
- `GET /committee/senate/{committeeCode}/nominations` - Senate nominations

#### Members API
- `GET /member` - Search congressional members
- `GET /member/{bioguideId}` - Get detailed member information

### Getting Started with API Testing
1. **Start the backend**: `cd backend && npm run dev`
2. **Open Swagger UI**: Navigate to [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
3. **Set API Key**: Use the "Authorize" button to set your Congress.gov API key
4. **Test Endpoints**: Click "Try it out" on any endpoint

## 🤝 Contributing

1. Check [project management docs](./proj-mgmt/README.md) for structure
2. Create feature branch from `main`
3. Implement according to epic/feature/story/task structure
4. Ensure tests pass and coverage maintained
5. Submit pull request with proper documentation

## 📊 Current Status

### ✅ Completed
- **Backend API Implementation**: Full bills and committees integration
- **Database Schema**: Complete entity models with TypeORM
- **API Caching**: Intelligent caching system for performance
- **Unit Testing**: Jest framework with 47% coverage baseline
- **Code Quality**: ESLint, TypeScript strict mode, comprehensive error handling
- **Project Management**: Complete documentation structure
- **Committee Integration**: All committee endpoints implemented

### 🚧 In Progress
- **Swagger Documentation**: Interactive API documentation setup
- **Frontend Committee Integration**: Angular components for committee functionality
- **Backend Express.js to NestJS migration**
- **Domain layer implementation**
- **CQRS pattern setup**

### 📋 Planned
- **NgRx State Management**: Advanced frontend state management
- **Redis Caching**: Production-grade caching layer
- **CI/CD Pipeline**: Automated testing and deployment
- **Performance Monitoring**: Application metrics and alerting

## 📞 Support

- **API Key**: Contact for Congress.gov API access
- **Issues**: GitHub Issues for bugs/features
- **Discussions**: GitHub Discussions for questions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This project uses real government data APIs. Please respect rate limits and terms of service.