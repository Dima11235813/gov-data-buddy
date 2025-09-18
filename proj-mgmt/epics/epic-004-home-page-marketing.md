# Epic 004: Home Page Marketing and Navigation

## Epic Overview
Create an engaging marketing splash page for the Government Data Buddy application that introduces users to the platform's purpose and provides clear navigation to key features. Restructure the frontend routing with a proper pages folder hierarchy and move existing bill content to a dedicated bills page.

## Business Value
- Improved user experience with clear value proposition
- Professional first impression for users
- Better information architecture with organized routing
- Clear separation between marketing content and functional pages
- Enhanced discoverability of application features

## Success Criteria
- [ ] Marketing splash page displays on home route (/)
- [ ] Bills content moved to dedicated /bills route
- [ ] Pages folder structure implemented in frontend
- [ ] Clear navigation between pages
- [ ] Responsive design for all screen sizes
- [ ] Professional, government-appropriate branding

## Estimated Effort
- **Story Points**: 21
- **Duration**: 2-3 weeks
- **Priority**: High
- **Risk Level**: Low

## Dependencies
- Frontend Angular application running
- Existing bills component functional

## Acceptance Criteria
- Marketing splash page with:
  - Clear project description
  - Key features highlight
  - Call-to-action buttons
  - Government-appropriate styling
- Pages folder structure:
  - /pages/home/ for marketing content
  - /pages/bills/ for bills functionality
  - /pages/committee/ for committee functionality (planned)
- Routing structure:
  - / → Marketing splash page
  - /bills → Bills page (moved from home)
  - /committee → Committee page (planned)
- Navigation components for seamless user flow

## Features Included
- [Feature 004-001: Marketing Splash Page](./../features/feature-004-001-marketing-splash-page.md)
- [Feature 004-002: Pages Folder Structure](./../features/feature-004-002-pages-folder-structure.md)
- [Feature 004-003: Bills Page Migration](./../features/feature-004-003-bills-page-migration.md)
