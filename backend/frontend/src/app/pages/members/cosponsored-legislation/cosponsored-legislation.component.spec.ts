import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CosponsoredLegislationComponent } from './cosponsored-legislation.component';
import { MembersService } from '../../../service/members.service';
import { SharedComponentsModule } from '../../../components/shared/shared-components.module';

describe('CosponsoredLegislationComponent', () => {
  let component: CosponsoredLegislationComponent;
  let fixture: ComponentFixture<CosponsoredLegislationComponent>;
  let membersService: jasmine.SpyObj<MembersService>;

  const mockBills = [
    {
      congress: 118,
      type: 'HR',
      number: 1234,
      title: 'Test Bill Title',
      updateDate: '2024-01-15',
      latestAction: {
        actionDate: '2024-01-10'
      }
    }
  ];

  beforeEach(async () => {
    const membersServiceSpy = jasmine.createSpyObj('MembersService', ['getMemberCosponsoredLegislation']);

    await TestBed.configureTestingModule({
      declarations: [CosponsoredLegislationComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedComponentsModule
      ],
      providers: [
        { provide: MembersService, useValue: membersServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CosponsoredLegislationComponent);
    component = fixture.componentInstance;
    membersService = TestBed.inject(MembersService) as jasmine.SpyObj<MembersService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cosponsored legislation on init', () => {
    const mockResponse = { cosponsoredLegislation: mockBills };
    membersService.getMemberCosponsoredLegislation.and.returnValue(of(mockResponse));

    component.ngOnInit();
    fixture.detectChanges();

    expect(membersService.getMemberCosponsoredLegislation).toHaveBeenCalled();
    expect(component.bills).toEqual(mockBills);
    expect(component.summary.count).toBe(1);
    expect(component.loading).toBeFalse();
  });

  it('should display bill information correctly', () => {
    component.bills = mockBills;
    component.loading = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.bill-item')).toBeTruthy();
    expect(compiled.textContent).toContain('HR1234 - 118');
    expect(compiled.textContent).toContain('Test Bill Title');
  });

  it('should show loading state initially', () => {
    component.loading = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading-container')).toBeTruthy();
  });

  it('should show no data message when no bills exist', () => {
    component.bills = [];
    component.loading = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No co-sponsored legislation found');
  });

  it('should handle error state', () => {
    spyOn(console, 'error');
    membersService.getMemberCosponsoredLegislation.and.returnValue(of(null as any));

    component.ngOnInit();
    fixture.detectChanges();

    expect(console.error).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
  });
});
