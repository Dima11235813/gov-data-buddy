# Epic 006: Bills Page Implementation

## Epic Overview
Implement a comprehensive Bills page that displays congressional bill information from the Government API, providing users with detailed bill tracking, status updates, and legislative progress monitoring. The UX should reflect the latest designs in `design/bills/lovable Screenshot 2025-09-18 184941.png` (Bills Database layout) and `design/bills/lovable bill status filter Screenshot 2025-09-18 185008.png` (status filter interaction).

## Business Value
- Real-time access to current legislation
- Understanding of bill progression through Congress
- Connection to sponsoring members and committees
- Enhanced civic engagement and transparency
- Educational tool for following legislative processes

## Success Criteria
- [ ] Bills list page displays recent legislation using reusable `BillCard` components
- [ ] Individual bill detail navigation available from each card
- [ ] Bill status surfaced with design-compliant chips (Enacted, Passed House, In Committee, Introduced)
- [ ] Search input and status filter menu functionally filter the list
- [ ] Components (`SearchInput`, `StatusSelect`, `BillCard`) live in shared module for reuse
- [ ] Responsive design for all devices

## Estimated Effort
- **Story Points**: 34
- **Duration**: 3-4 weeks
- **Priority**: High
- **Risk Level**: Medium

## Dependencies
- Government API integration functional
- Frontend pages folder structure (Epic 004)
- NGRX state management setup
- Bills service implementation

## Acceptance Criteria
- Bills listing with:
  - Bill number and title
  - Current status chip with color per design
  - Introduction date
  - Latest action text and date
- Bill detail navigation from each card's primary action
- Search and filtering by:
  - Bill number or keyword (search box)
  - Status (status filter menu: All, Enacted, Passed House, In Committee, Introduced)
- Componentization for reuse across pages
- Proper caching/performance to be addressed in a later story

## Features Included
- [Feature 006-001: Bills List Page](./../features/feature-006-001-bills-list-page.md)
- [Feature 006-002: Bill Detail Page](./../features/feature-006-002-bill-detail-page.md)
- [Feature 006-003: Bills Search & Filter](./../features/feature-006-003-bills-search-filter.md)
- [Feature 006-004: Entity Linking in Bills](./../features/feature-006-004-entity-linking-in-bills.md)
 
## User Stories
- [Story 006-001: Bills List UI with Search and Status Filter](./../stories/story-006-001-bills-list-ui.md)
- [Story 006-002: Navigate to Bill Details](./../stories/story-006-002-bill-detail-navigation.md)
- [Story 006-003: Persist Bills Filters in URL Query Params](./../stories/story-006-003-bills-query-param-persistence.md)
