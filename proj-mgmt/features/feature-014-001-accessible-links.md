Feature: 014-001 - Accessible Link Semantics and Themed Routing Links

Objective:
Introduce a reusable link wrapper to ensure all navigational links:
- Preserve native browser behavior
- Adhere to accessibility best practices
- Maintain Angular client-side routing conveniences
- Match the app theme without default blue/purple styling

Requirements:
- Create `app-link` component supporting `[routerLink]`, `href`, query params, and fragments.
- Default to `queryParamsHandling='preserve'` and preserve fragments when not provided.
- Style to: `color: inherit`, `text-decoration: none`; underline on hover/focus; focus-visible outline using theme primary.
- Replace existing `routerLink` usage in header, footer, home, and bill details sponsors.
- Document and test keyboard-only navigation and native link behaviors.

Acceptance Tests:
- Ctrl/Cmd+Click opens in new tab.
- Middle-click opens in new tab.
- Hover shows destination URL.
- Focus-visible outline present.
- Query params and fragments preserved by default.

