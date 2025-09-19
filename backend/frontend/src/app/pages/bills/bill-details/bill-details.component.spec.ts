import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { BillDetailsComponent } from './bill-details.component';
import { BillsService } from '../../../service/bills.service';
import { SharedComponentsModule } from '../../../components/shared/shared-components.module';

describe('BillDetailsComponent', () => {
  let component: BillDetailsComponent;
  let fixture: ComponentFixture<BillDetailsComponent>;
  let mockBillsService: jasmine.SpyObj<BillsService>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const billsServiceSpy = jasmine.createSpyObj('BillsService', ['getBillDetails']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.callFake((key: string) => {
            const params: { [key: string]: string } = {
              congress: '118',
              billType: 'hr',
              billNumber: '3076'
            };
            return params[key] || null;
          })
        }
      }
    });
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [BillDetailsComponent],
      imports: [SharedComponentsModule],
      providers: [
        { provide: BillsService, useValue: billsServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BillDetailsComponent);
    component = fixture.componentInstance;
    mockBillsService = TestBed.inject(BillsService) as jasmine.SpyObj<BillsService>;
    mockActivatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load bill details on init', () => {
    const mockBillDetails = {
      title: 'Test Bill',
      number: '3076',
      type: 'hr',
      congress: 118
    };

    mockBillsService.getBillDetails.and.returnValue(of(mockBillDetails));

    component.ngOnInit();

    expect(mockBillsService.getBillDetails).toHaveBeenCalledWith('http://localhost:3000/bill/118/hr/3076');
    expect(component.loading).toBeFalse();
  });

  it('should handle error when loading bill details', () => {
    mockBillsService.getBillDetails.and.returnValue(of(null).pipe(
      // Simulate error by throwing
      () => { throw new Error('API Error'); }
    ) as any);

    component.ngOnInit();

    expect(component.error).toBe('Failed to load bill details. Please try again.');
    expect(component.loading).toBeFalse();
  });

  it('should navigate back to bills on goBack', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/bills']);
  });

  it('should return correct status label', () => {
    expect(component.getStatusLabel({ text: 'Signed into law' })).toBe('Enacted');
    expect(component.getStatusLabel({ text: 'Passed House' })).toBe('Passed House');
    expect(component.getStatusLabel({ text: 'Committee hearing' })).toBe('In Committee');
    expect(component.getStatusLabel({ text: 'Introduced' })).toBe('Introduced');
    expect(component.getStatusLabel()).toBe('Introduced');
  });
});
