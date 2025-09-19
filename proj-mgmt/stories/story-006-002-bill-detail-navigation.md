# Story 006-002: Navigate to Bill Details

## Description
Allow users to navigate to detailed bill information from the Bills list via a "View Details" action that routes to the internal bill details page.

## Acceptance Criteria
- Each bill card includes a primary action button to view details.
- The action navigates to internal bill details route: `/bills/details/{congress}/{billType}/{billNumber}`
- Fallback to external URL if bill parameters are not available
- Accessibility: button has discernible text and focus styles.

## Implementation Notes
- Updated `BillCardComponent` to use router navigation instead of external links
- Added `viewDetails()` method that checks for bill parameters and navigates accordingly
- Route configured in bills page routing module

## Definition of Done
- Navigation to bill details page works for all listed bills with valid parameters
- Lints pass
- Component properly handles missing bill data
