# Task: Frontend Committee Integration

## Overview
Integrate committee functionality into the Angular frontend to match the backend API implementation.

## Background
The backend now supports full committee CRUD operations with caching, validation, and comprehensive API endpoints. The frontend needs to be updated to consume these endpoints and provide a complete committee browsing experience.

## Requirements

### 1. Committee Service
- Create `CommitteeService` in `src/app/services/`
- Implement methods for all committee endpoints:
  - `getCommittees()` - Get list of committees
  - `getCommitteeDetails(chamber: string, committeeCode: string)` - Get specific committee details
  - `getCommitteeBills(chamber: string, committeeCode: string)` - Get committee bills
  - `getCommitteeReports(chamber: string, committeeCode: string)` - Get committee reports
  - `getCommitteeCommunications(chamber: string, committeeCode: string)` - Get house communications
  - `getCommitteeNominations(committeeCode: string)` - Get senate nominations

### 2. Committee Models
- Create TypeScript interfaces in `src/app/models/`:
  - `Committee.ts`
  - `CommitteeDetail.ts`
  - `CommitteeBill.ts`
  - `CommitteeReport.ts`
  - `CommitteeCommunication.ts`
  - `CommitteeNomination.ts`

### 3. Committee Components
Create the following components in `src/app/pages/committee/`:

#### CommitteeListComponent
- Display paginated list of committees
- Filter by chamber (House/Senate/Joint)
- Filter by congress
- Search functionality
- Sort by name, chamber, type

#### CommitteeDetailComponent
- Display detailed committee information
- Show subcommittee hierarchy
- Display committee history
- Show related bills count, reports count, communications count

#### CommitteeBillsComponent
- Display bills associated with committee
- Pagination support
- Filter by date range
- Sort by action date, type, number

#### CommitteeReportsComponent
- Display committee reports
- Filter by congress, type
- Sort by date, number

### 4. Routing Updates
Update `src/app/pages/committee/committee-page-routing.module.ts`:
```
/committee -> CommitteeListComponent
/committee/:chamber/:committeeCode -> CommitteeDetailComponent
/committee/:chamber/:committeeCode/bills -> CommitteeBillsComponent
/committee/:chamber/:committeeCode/reports -> CommitteeReportsComponent
```

### 5. Navigation Updates
Update navigation component to include committee links:
- Add "Committees" to main navigation
- Include committee-related links in navigation menu

### 6. State Management (NgRx)
If using NgRx store, update state management:
- Add committee-related actions
- Add committee reducers
- Add committee selectors
- Update effects for API calls

### 7. Error Handling
- Implement proper error handling for API failures
- Display user-friendly error messages
- Handle rate limiting gracefully
- Implement retry logic for failed requests

### 8. Loading States
- Add loading spinners for all async operations
- Implement skeleton loading for lists
- Show loading indicators during data fetch

### 9. Responsive Design
- Ensure all committee components are mobile-responsive
- Implement responsive tables with horizontal scroll
- Optimize layouts for different screen sizes

### 10. Testing
- Unit tests for CommitteeService
- Unit tests for all committee components
- Integration tests for committee routes
- E2E tests for committee functionality

## Technical Considerations

### API Integration
- Handle all query parameters (format, offset, limit, fromDateTime, toDateTime)
- Implement proper TypeScript typing for API responses
- Handle pagination metadata from API

### Caching Strategy
- Leverage backend caching by implementing frontend caching
- Cache committee data locally to reduce API calls
- Implement cache invalidation strategy

### Performance Optimization
- Implement virtual scrolling for large lists
- Use lazy loading for committee detail views
- Implement efficient search and filtering

## Acceptance Criteria
- [ ] All committee endpoints are accessible from frontend
- [ ] Committee list displays correctly with filtering and search
- [ ] Committee details show comprehensive information
- [ ] Related bills, reports, and communications are accessible
- [ ] Responsive design works on all screen sizes
- [ ] Error handling is implemented and user-friendly
- [ ] Loading states are properly implemented
- [ ] All TypeScript types are properly defined
- [ ] Unit tests pass with >80% coverage
- [ ] E2E tests pass for critical user journeys

## Dependencies
- Backend committee API implementation (completed)
- NgRx store setup (if applicable)
- Base service and model patterns established

## Estimated Effort
- Committee Service: 4 hours
- Models and Interfaces: 2 hours
- Committee List Component: 6 hours
- Committee Detail Component: 6 hours
- Committee Bills Component: 4 hours
- Committee Reports Component: 4 hours
- Routing and Navigation: 2 hours
- State Management Updates: 4 hours
- Testing: 8 hours
- Responsive Design and Polish: 4 hours

**Total: ~44 hours**

## Related Files
- `src/app/services/committee.service.ts` (new)
- `src/app/models/committee*.ts` (new)
- `src/app/pages/committee/` (new directory)
- `src/app/app-routing.module.ts` (update)
- `src/app/components/shared/navigation/` (update)
