# Story 006-002: Navigate to Bill Details

## Description
Allow users to open the details for a bill from the Bills list via a "View Details" action consistent with the designs.

## Acceptance Criteria
- Each bill card includes a primary action to view details.
- The action opens the bill details in a new tab if the source URL is external, or navigates to an internal route if available.
- Accessibility: action has discernible text and focus styles.

## Implementation Notes
- Current data includes a `url` field to Congress.gov; use as `href` with `target="_blank"` until internal details page is implemented.
- Reuse `BillCardComponent` action area.

## Definition of Done
- Open in new tab works for all listed bills that have a URL.
- Lints pass.
