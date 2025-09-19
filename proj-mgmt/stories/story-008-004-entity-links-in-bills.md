# Story 008-004: Add Entity Links to Bill Display

As a user viewing a bill, I want to see clickable links for known entities mentioned in the bill text so that I can easily navigate to related information.

## Acceptance Criteria
- Known entities in bill descriptions are automatically linked
- Links navigate to appropriate pages (member/committee pages)
- Link styling is consistent with application design
- Links open in same tab to maintain user context
- Entity recognition works for various mention formats
- Performance impact is minimal on page load
- Keyboard navigation supported for accessibility
- Fallback handling for unrecognized entities

## Example Scenarios
- "Representative Ilhan Omar of Minnesota" → link to Ilhan Omar's member page
- "Committee on Education and Workforce" → link to committee page
- "House Budget Committee" → link to committee page
- Multiple entities in same text are all properly linked
- Unrecognized entities remain as plain text
