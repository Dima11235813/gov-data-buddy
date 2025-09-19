import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MemberDirectoryComponent } from './member-directory.component';
import { MembersService } from '../../../service/members.service';

describe('MemberDirectoryComponent', () => {
  let component: MemberDirectoryComponent;
  let fixture: ComponentFixture<MemberDirectoryComponent>;
  let membersServiceSpy: jasmine.SpyObj<MembersService>;

  beforeEach(async () => {
    membersServiceSpy = jasmine.createSpyObj('MembersService', ['getMembers']);

    await TestBed.configureTestingModule({
      declarations: [MemberDirectoryComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MembersService, useValue: membersServiceSpy },
        { provide: ActivatedRoute, useValue: { queryParams: of({ search: 'Pelosi', party: 'D', state: 'CA', page: '1', pageSize: '24' }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberDirectoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    membersServiceSpy.getMembers.and.returnValue(of({ members: [] }) as any);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize form from query params and call service with filtered params', () => {
    membersServiceSpy.getMembers.and.returnValue(of({ members: [] }) as any);
    fixture.detectChanges();

    expect(component.searchForm.value.search).toBe('Pelosi');
    expect(component.pageIndex).toBe(1);
    expect(component.pageSize).toBe(24);

    expect(membersServiceSpy.getMembers).toHaveBeenCalledWith(jasmine.objectContaining({
      search: 'Pelosi',
      party: 'D',
      state: 'CA',
      offset: 24,
      limit: 24
    }));
  });

  it('should update query params on page change', () => {
    membersServiceSpy.getMembers.and.returnValue(of({ members: [] }) as any);
    fixture.detectChanges();

    component.onPageChange({ pageIndex: 2, pageSize: 12 });
    expect(component.pageIndex).toBe(2);
    expect(component.pageSize).toBe(12);
  });
});


