# Story 007-001: Display Bill Details from API

## Description
As a user, I want to view detailed information about a specific bill so that I can understand its content, sponsors, status, and related legislative information.

## Acceptance Criteria
- Bill details page displays comprehensive bill information including:
  - Bill number, title, and introduction date
  - Current status and latest action
  - Bill sponsors and co-sponsors
  - Associated committees
  - Policy area and subjects
  - Related bills count
  - Text versions and summaries availability
- Page loads bill details using the bill ID from the URL parameters
- Proper loading states while fetching data
- Error handling for invalid bill IDs or API failures
- Navigation back to bills list

## Implementation Notes
- Create bill-details component in `pages/bills/bill-details/`
- Use route parameters to extract congress, billType, and billNumber
- Integrate with existing BillsService.getBillDetails method
- Follow existing design patterns from other pages
- Add proper error handling and user feedback

## Definition of Done
- Bill details page functional and displays API data
- Routing works correctly with parameters
- Loading and error states handled
- Component follows existing patterns
- Linting passes
