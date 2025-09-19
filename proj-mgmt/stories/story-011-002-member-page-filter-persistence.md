# Story 011-002: Member Page Filter Interactions Persisted

## Story Overview
As a user, I want all my filter interactions on the Members page (search, state, party, chamber, and pagination) to be persisted in the URL so that I can share, bookmark, and restore the exact view.

## Acceptance Criteria
- [ ] Search input value persists to URL and back (bidirectional)
- [ ] State, Party, and Chamber selects persist to URL and back
- [ ] Pagination (page, pageSize) persists to URL and back
- [ ] Debounced updates (≥ 500ms) to avoid excessive updates
- [ ] Empty values are not included in URL
- [ ] Browser back/forward restores the correct state
- [ ] Initial load reads URL and initializes the form and grid

## Technical Notes
- Use `ActivatedRoute.queryParams` to initialize form and pagination
- Use `router.navigate([], { queryParams, queryParamsHandling: 'merge' })` for updates
- Only include defined, non-empty values
- Service calls include `offset = pageIndex * pageSize` and `limit = pageSize`

## Testing
- Unit tests for component to verify:
  - Query params -> form and pagination
  - Form/pagination -> query params
  - Service called with filtered params only
- E2E tests capture screenshots and verify URL updates

## Definition of Done
- [ ] Feature implemented with unit tests passing
- [ ] E2E tests updated and passing
- [ ] Code reviewed and merged
