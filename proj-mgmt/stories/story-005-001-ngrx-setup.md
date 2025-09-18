# Story 005-001: Setup NgRx Store

## Story Overview
As a developer, I want to set up NgRx store with proper configuration so that I can implement state management across the application.

## Acceptance Criteria
- [ ] NgRx packages installed and configured
- [ ] Store module properly imported in app module
- [ ] DevTools configured for development
- [ ] Store freeze enabled in development
- [ ] Basic app state structure defined
- [ ] Store initialization working

## Technical Details

### Package Installation
```json
{
  "@ngrx/store": "^15.0.0",
  "@ngrx/effects": "^15.0.0",
  "@ngrx/store-devtools": "^15.0.0",
  "@ngrx/router-store": "^15.0.0"
}
```

### Store Configuration
```typescript
// app.module.ts
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ]
})
export class AppModule {}
```

### Initial App State
```typescript
export interface AppState {
  bills: BillsState;
  members: MembersState;
  router: RouterState;
}

export const initialState: AppState = {
  bills: billsInitialState,
  members: membersInitialState,
  router: routerInitialState
};
```

## Tasks
- [Task 005-001-001: Install NgRx Packages](./../tasks/task-005-001-001-install-ngrx.md)
- [Task 005-001-002: Configure Store Module](./../tasks/task-005-001-002-configure-store.md)
- [Task 005-001-003: Setup DevTools](./../tasks/task-005-001-003-setup-devtools.md)
- [Task 005-001-004: Create Initial State](./../tasks/task-005-001-004-initial-state.md)
- [Task 005-001-005: Add Store Freeze](./../tasks/task-005-001-005-store-freeze.md)

## Definition of Done
- Application builds successfully
- Store is accessible in components
- DevTools working in browser
- No runtime errors
- Basic store functionality tested
