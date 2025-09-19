# Story 006-001: Bills List UI with Search and Status Filter

## Description
Implement the Bills list page UI based on the latest designs (see `design/bills/lovable Screenshot 2025-09-18 184941.png` and `design/bills/lovable bill status filter Screenshot 2025-09-18 185008.png`). The page should display a searchable and filterable list of congressional bills with a clean card layout.

## Acceptance Criteria
- A page header displays title "Bills Database" with subtitle as in design.
- A search input allows searching by bill title or number and updates results instantly.
- A status filter dropdown offers: "All Statuses", "Enacted", "Passed House", "In Committee", "Introduced".
- Bill results render as reusable `Bill Card` components matching the card layout in the design.
- Results update when search text or status filter changes.
- Empty state displays a friendly message when no results.
- Componentized controls are placed in shared module for reuse across pages.

## Implementation Notes
- Create components: `app/components/shared/ui/bill-card`, `app/components/shared/ui/search-input`, `app/components/shared/ui/status-select`.
- Import them via `SharedComponentsModule` and render in `BillsComponent`.
- Status calculation is inferred from `latestAction.text` until backend provides an explicit status field.

## Definition of Done
- Lints pass and project compiles.
- Page visually approximates provided designs on desktop and mobile widths.
- PR includes screenshots referencing the two design images.
