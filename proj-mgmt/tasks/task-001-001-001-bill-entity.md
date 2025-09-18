# Task 001-001-001: Create Bill Entity

## Task Overview
Implement the Bill domain entity with proper validation, business rules, and encapsulation.

## Technical Details

### Bill Entity Structure
```typescript
// domain/entities/bill.ts
export class Bill {
  private constructor(
    public readonly id: BillId,
    public readonly congress: CongressNumber,
    public readonly billType: BillType,
    public readonly billNumber: BillNumber,
    public readonly title: string,
    public readonly introducedDate: Date,
    public status: BillStatus,
    private actions: Action[] = []
  ) {}

  static create(props: CreateBillProps): Result<Bill, DomainError> {
    // Implementation
  }

  public getActions(): ReadonlyArray<Action> {
    return [...this.actions];
  }

  public addAction(action: Action): Result<void, DomainError> {
    // Business rule: validate action type for current status
  }

  public updateStatus(newStatus: BillStatus): Result<void, DomainError> {
    // Business rule: validate status transition
  }
}
```

### Validation Rules
- Congress number must be between 1-117
- Bill type must be valid enum (HR, S, HJRES, SJRES, HCONRES, SCONRES, HRES, SRES)
- Bill number must be positive integer
- Title cannot be empty and must be < 1000 characters
- Introduced date cannot be in future

## Implementation Steps
1. Create BillId value object
2. Create BillType enum
3. Create BillStatus enum with valid transitions
4. Implement Bill entity class
5. Add factory method with validation
6. Add business methods with rules
7. Create unit tests

## Files to Create/Modify
- `src/domain/entities/bill.ts`
- `src/domain/value-objects/bill-id.ts`
- `src/domain/value-objects/bill-type.ts`
- `src/domain/value-objects/bill-status.ts`
- `src/domain/errors/domain-errors.ts`

## Testing Requirements
- Unit tests for creation validation
- Unit tests for business rule enforcement
- Unit tests for status transitions
- Edge case testing

## Definition of Done
- [ ] Bill entity compiles without errors
- [ ] All validation rules implemented
- [ ] Business rules properly enforced
- [ ] Unit tests pass with >90% coverage
- [ ] Code follows DDD principles
- [ ] Documentation updated
