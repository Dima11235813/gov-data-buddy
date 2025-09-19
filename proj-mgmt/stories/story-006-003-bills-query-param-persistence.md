# Story 006-003: Persist Bills Filters in URL Query Params

## Description
Ensure the Bills page is linkable and stateful by persisting the status filter and search query in the URL. When a user changes the filter or search input, the URL should update with query parameters. On reload or share, the page should initialize from those params.

## Acceptance Criteria
- Changing status filter updates `?status=` in the URL without full page reload.
- Changing search text updates `?q=` in the URL (debounced to avoid spam updates).
- On initial load, the page reads `status` and `q` query params and applies them to the UI and results.
- Copying the URL and reopening yields the same filtered list and search text.
- Unsupported status values fallback to `All`.

## Technical Notes
- Use Angular `ActivatedRoute` to read params and `Router.navigate([], { queryParams, queryParamsHandling: 'merge' })` to update.
- Debounce search updates by ~300ms.
- Keep values in `BillsComponent` state and render through existing `SearchInput` and `StatusSelect` components.

## Definition of Done
- Lints pass, and manual test confirms persistence across reloads and direct links.
