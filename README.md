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

- **[Architecture Overview](./proj-mgmt/docs/architecture-overview.md)** - Complete technical architecture
- **[Project Management](./proj-mgmt/README.md)** - Development process and structure
- **[API Documentation](./backend/README.md)** - Backend API details
- **[Frontend Guide](./backend/frontend/README.md)** - Frontend development guide

### Key Epics
- **[Epic 001: Backend Modernization](./proj-mgmt/epics/epic-001-backend-architecture-modernization.md)** - DDD + CQRS implementation
- **[Epic 002: Frontend State Management](./proj-mgmt/epics/epic-002-frontend-state-management.md)** - NgRx implementation
- **[Epic 003: Caching Layer](./proj-mgmt/epics/epic-003-caching-persistence-layer.md)** - Performance optimization

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

## 🤝 Contributing

1. Check [project management docs](./proj-mgmt/README.md) for structure
2. Create feature branch from `main`
3. Implement according to epic/feature/story/task structure
4. Ensure tests pass and coverage maintained
5. Submit pull request with proper documentation

## 📊 Current Status

### ✅ Completed
- Database cleanup (single db.sqlite with full schema)
- Project management structure established
- Architecture documentation created
- Enterprise-grade roadmap defined

### 🚧 In Progress
- Backend Express.js to NestJS migration
- Domain layer implementation
- CQRS pattern setup

### 📋 Planned
- NgRx frontend state management
- Redis caching implementation
- Advanced persistence layer
- Performance monitoring

## 📞 Support

- **API Key**: Contact for Congress.gov API access
- **Issues**: GitHub Issues for bugs/features
- **Discussions**: GitHub Discussions for questions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This project uses real government data APIs. Please respect rate limits and terms of service.