Story: 014-001 - Shared Link Component with Accessibility and Native Behavior Preservation

Summary:
Create a reusable `app-link` component that centralizes link behavior, ensuring accessibility compliance and native browser link functionality while using Angular client-side routing.

Goals:
- Preserve native link behaviors: Ctrl/Cmd+Click, middle-click, context menu, hover URL preview.
- Support Angular routing with `[routerLink]` while preserving query params and fragments.
- Theming: avoid default blue/purple; match site theme, add focus-visible outline.
- Semantics first: always use `<a>` for navigation, not div/span/button.
- Extensible: allow wrapping complex content via `<ng-content>` (cards, rows).

Acceptance Criteria:
- `app-link` renders an `<a>` element with `routerLink` (internal) or `href` (external).
- Defaults: `queryParamsHandling='preserve'`, preserves current fragment when not provided.
- Accessible: meaningful link text or `aria-label` provided by consumers; focus-visible outline present.
- Visually consistent with theme; no default visited color.
- Replaces existing `routerLink` anchors in header, footer, homepage, and bill details sponsors.

Non-Goals:
- Button semantics. Use `<button>` for actions.

Notes:
- External links opened in new tab should include `rel="noopener"`.
- Follow MDN and WAI-ARIA guidance on link semantics.

