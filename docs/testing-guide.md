# Testing Guide

This guide covers both unit testing and end-to-end (e2e) testing for the Government Data Buddy frontend application.

## Unit Testing

Unit tests are written using Jasmine and Karma.

### Running Unit Tests

```bash
# Run unit tests once
npm test

# Run unit tests in watch mode
npm run test -- --watch

# Run unit tests with code coverage
npm run test -- --code-coverage
```

### Writing Unit Tests

Unit tests should be placed alongside the component/service files with the `.spec.ts` extension.

Example test structure:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './my-component.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## End-to-End (E2E) Testing

E2E tests are written using Playwright for comprehensive browser automation testing.

### Prerequisites

1. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

### Running E2E Tests

```bash
# Run all e2e tests
npm run test:e2e

# Run e2e tests with UI mode (visual test runner)
npm run test:e2e:ui

# Run e2e tests in headed mode (see browser)
npm run test:e2e:headed

# Run e2e tests in debug mode
npm run test:e2e:debug

# Run specific test file
npx playwright test home-page.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
```

### Visual Regression Testing

The e2e tests automatically capture screenshots for visual regression testing:

- Screenshots are saved in `e2e/screenshots/`
- Current screenshots are compared against baseline screenshots
- Tests fail if visual differences are detected

To update baseline screenshots after intentional UI changes:
```bash
# Delete existing screenshots and run tests to capture new baselines
rm -rf e2e/screenshots
npm run test:e2e
```

### Writing E2E Tests

E2E tests are located in the `e2e/` directory. Tests use Playwright's test runner.

Example test structure:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Page Name', () => {
  test('should perform action', async ({ page }) => {
    // Navigate to page
    await page.goto('/page-url');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Take screenshot for visual regression
    await page.screenshot({
      path: 'e2e/screenshots/test-name.png',
      fullPage: true
    });

    // Assertions
    await expect(page.locator('selector')).toBeVisible();
    await expect(page.locator('selector')).toHaveText('Expected Text');
  });
});
```

### Playwright Configuration

The Playwright configuration is in `playwright.config.ts` and includes:

- Test directory: `./e2e`
- Base URL: `http://localhost:4200`
- Multiple browser support (Chromium, Firefox, WebKit)
- Mobile viewport testing
- Automatic dev server startup
- Screenshot capture on failure

## Continuous Integration

### GitHub Actions

For CI/CD pipelines, use the following workflow:

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install
      - name: Run e2e tests
        run: npm run test:e2e
```

## Best Practices

### Unit Testing
1. Test one thing per test case
2. Use descriptive test names
3. Test both positive and negative scenarios
4. Mock external dependencies
5. Keep tests fast and isolated

### E2E Testing
1. Use data-testid attributes for reliable element selection
2. Wait for network idle before assertions
3. Test user journeys, not individual functions
4. Keep tests independent
5. Use descriptive test names and comments

### Visual Regression
1. Review screenshot differences carefully
2. Update baselines only for intentional changes
3. Use consistent viewport sizes
4. Test across multiple browsers and devices

## Troubleshooting

### Common Issues

1. **E2E tests fail due to timing issues**
   - Add `await page.waitForLoadState('networkidle')`
   - Use more specific selectors
   - Add explicit waits for elements

2. **Visual regression false positives**
   - Ensure consistent viewport sizes
   - Wait for animations to complete
   - Use stable test data

3. **Browser-specific failures**
   - Test in multiple browsers
   - Use browser-specific test configurations
   - Check for browser compatibility issues

### Debugging

1. Use `npm run test:e2e:debug` for step-by-step debugging
2. Use `npm run test:e2e:ui` for the visual test runner
3. Add `await page.pause()` in tests for manual debugging
4. Check Playwright traces in `test-results/` directory

## Test Organization

```
frontend/
├── src/
│   └── app/
│       ├── components/
│       │   └── my-component/
│       │       ├── my-component.component.ts
│       │       └── my-component.component.spec.ts  # Unit tests
│       └── services/
│           └── my-service/
│               ├── my-service.service.ts
│               └── my-service.service.spec.ts      # Unit tests
├── e2e/
│   ├── home-page.spec.ts                          # E2E tests
│   └── screenshots/                               # Visual regression
│       ├── home-page-current.png
│       └── home-page-mobile.png
└── playwright.config.ts                           # E2E configuration
```
