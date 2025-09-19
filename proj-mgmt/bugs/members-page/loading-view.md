# Bug: Members page lacks skeleton loading state and full-height layout

## Description
The Members page shows a blank area with a spinner during data load. It should display a skeleton layout to avoid layout shift and improve perceived performance. The members grid should expand to fill available viewport height and pagination should persist to the URL.

## Expected
- Skeleton cards render while loading
- Grid uses available height and avoids large empty areas
- Pagination state is persisted in query params

## Actual
- Only whitespace and a spinner are shown
- Grid height is minimal on large screens
- Pagination does not persist to URL

## Fix Summary
- Added CSS skeleton loading grid
- Enforced min-height for grid and page container
- Persisted `page` and `pageSize` to query params and restored on load

## Screenshots
- See `proj-mgmt/bugs/members-page/loading-view.png`
