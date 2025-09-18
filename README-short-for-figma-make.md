# Government Data Buddy

A comprehensive web application providing user-friendly access to U.S. Congressional data through the Congress.gov API, featuring enterprise-grade architecture with domain-driven design, CQRS patterns, and advanced caching.

## 🚀 Project Overview

Government Data Buddy serves as a bridge between complex government APIs and end-users, offering:
- **Cached Performance**: Intelligent caching reduces API calls and improves response times
- **Enterprise Architecture**: Domain-driven design with CQRS for scalability
- **Modern Frontend**: Angular with NgRx state management
- **Robust Backend**: NestJS with comprehensive error handling and logging

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