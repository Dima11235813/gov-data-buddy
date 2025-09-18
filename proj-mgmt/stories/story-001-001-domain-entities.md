# Story 001-001: Define Domain Entities

## Story Overview
As a developer, I want to define domain entities with proper validation and business rules so that the core business logic is encapsulated and validated.

## Acceptance Criteria
- [ ] Bill entity with required fields and validation
- [ ] Member entity with proper relationships
- [ ] Committee entity with member associations
- [ ] Action entity with status tracking
- [ ] All entities have unique identifiers
- [ ] Business rules enforced at entity level
- [ ] Entities are serializable/deserializable

## Technical Details

### Bill Entity
```typescript
export class Bill {
  private constructor(
    public readonly id: BillId,
    public readonly congress: CongressNumber,
    public readonly billType: BillType,
    public readonly billNumber: BillNumber,
    public readonly title: string,
    public readonly status: BillStatus,
    public readonly introducedDate: Date,
    private _actions: Action[] = []
  ) {}

  static create(props: CreateBillProps): Result<Bill, DomainError> {
    // Validation and creation logic
  }

  addAction(action: Action): Result<void, DomainError> {
    // Business rule validation
  }
}
```

### Validation Rules
- Bill numbers must be unique within congress
- Bill types must be valid (HR, S, HJRES, etc.)
- Dates must fall within congress session
- Status transitions must follow valid paths

## Tasks
- [Task 001-001-001: Create Bill Entity](./../tasks/task-001-001-001-bill-entity.md)
- [Task 001-001-002: Create Member Entity](./../tasks/task-001-001-002-member-entity.md)
- [Task 001-001-003: Create Committee Entity](./../tasks/task-001-001-003-committee-entity.md)
- [Task 001-001-004: Create Action Entity](./../tasks/task-001-001-004-action-entity.md)
- [Task 001-001-005: Add Entity Validation](./../tasks/task-001-001-005-entity-validation.md)

## Definition of Done
- All entities compile without errors
- Unit tests pass (>90% coverage)
- Entities follow DDD principles
- Business rules are properly encapsulated
- Documentation updated
