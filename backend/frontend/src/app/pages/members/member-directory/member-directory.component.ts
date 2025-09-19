import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MembersService, MemberSearchParams } from '../../../service/members.service';
import { MemberDto } from '../../../../../../../backend/shared/Member.model';

@Component({
  selector: 'app-member-directory',
  template: `
    <div class="member-directory">
      <page-header pageHeading="Members of Congress" [subtitle]="'Browse and search congressional members'"></page-header>

      <form class="search-filters" [formGroup]="searchForm">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search Members</mat-label>
          <input matInput placeholder="Search by name..." formControlName="search">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>State</mat-label>
          <mat-select formControlName="state">
            <mat-option value="">All States</mat-option>
            <mat-option value="AL">Alabama</mat-option>
            <mat-option value="AK">Alaska</mat-option>
            <!-- Add all states -->
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Party</mat-label>
          <mat-select formControlName="party">
            <mat-option value="">All Parties</mat-option>
            <mat-option value="D">Democrat</mat-option>
            <mat-option value="R">Republican</mat-option>
            <mat-option value="I">Independent</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Chamber</mat-label>
          <mat-select formControlName="chamber">
            <mat-option value="">All</mat-option>
            <mat-option value="house">House</mat-option>
            <mat-option value="senate">Senate</mat-option>
          </mat-select>
        </mat-form-field>
      </form>

      <div class="members-grid" *ngIf="!loading && members.length > 0; else loadingTemplate">
        <mat-card class="member-card" *ngFor="let member of members" [routerLink]="['/members', member.bioguideId]">
          <mat-card-header>
            <div mat-card-avatar class="member-avatar">
              <mat-icon>person</mat-icon>
            </div>
            <mat-card-title>{{ member.name }}</mat-card-title>
            <mat-card-subtitle>{{ member.party }}-{{ member.state }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p *ngIf="member.district">District {{ member.district }}</p>
            <p *ngIf="!member.district">Senator</p>
          </mat-card-content>
        </mat-card>
      </div>

      <ng-template #loadingTemplate>
        <div class="loading-container">
          <div class="skeleton-grid">
            <div class="skeleton-card" *ngFor="let s of [].constructor(12)">
              <div class="skeleton-avatar"></div>
              <div class="skeleton-line short"></div>
              <div class="skeleton-line"></div>
            </div>
          </div>
        </div>
      </ng-template>

      <mat-paginator
        *ngIf="totalMembers > pageSize"
        [length]="totalMembers"
        [pageSize]="pageSize"
        [pageSizeOptions]="[12, 24, 48]"
        [pageIndex]="pageIndex"
        (page)="onPageChange($event)">
      </mat-paginator>
    </div>
  `,
  styles: [`
    .member-directory {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      min-height: calc(100vh - 180px);
    }

    .search-filters {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .search-field {
      grid-column: 1;
    }

    .members-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
      min-height: 50vh;
    }

    .member-card {
      cursor: pointer;
      transition: transform 0.2s;
    }

    .member-card:hover {
      transform: translateY(-4px);
    }

    .member-avatar {
      background-color: #3f51b5;
      color: white;
    }

    .loading-container {
      padding: 16px 0 24px 0;
    }

    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }

    .skeleton-card {
      background: #fff;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
      min-height: 120px;
    }

    .skeleton-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(90deg, #ececec 25%, #f5f5f5 37%, #ececec 63%);
      background-size: 400% 100%;
      animation: shimmer 1.4s ease infinite;
      margin-bottom: 12px;
    }

    .skeleton-line {
      height: 12px;
      border-radius: 6px;
      background: linear-gradient(90deg, #ececec 25%, #f5f5f5 37%, #ececec 63%);
      background-size: 400% 100%;
      animation: shimmer 1.4s ease infinite;
      margin-bottom: 8px;
    }

    .skeleton-line.short { width: 60%; }

    @keyframes shimmer {
      0% { background-position: 100% 0; }
      100% { background-position: 0 0; }
    }
  `]
})
export class MemberDirectoryComponent implements OnInit {
  searchForm: FormGroup;
  members: MemberDto[] = [];
  loading = true;
  totalMembers = 0;
  pageSize = 12;
  private searchTimeout: any;
  pageIndex = 0;

  constructor(
    private fb: FormBuilder,
    private membersService: MembersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.searchForm = this.fb.group({
      search: [''],
      state: [''],
      party: [''],
      chamber: ['']
    });
  }

  ngOnInit() {
    // Initialize form from query parameters
    this.route.queryParams.subscribe(params => {
      this.searchForm.patchValue({
        search: params['search'] || '',
        state: params['state'] || '',
        party: params['party'] || '',
        chamber: params['chamber'] || ''
      });
      this.pageIndex = Number(params['page'] || 0);
      this.pageSize = Number(params['pageSize'] || this.pageSize);
      this.loadMembers();
    });

    // Debounced form changes to avoid excessive API calls
    this.searchForm.valueChanges.subscribe(() => {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.updateQueryParams();
        this.loadMembers();
      }, 500); // 500ms debounce
    });
  }

  private updateQueryParams() {
    const formValues = this.searchForm.value;
    const queryParams: any = {};

    // Only include non-empty values
    if (formValues.search?.trim()) {
      queryParams.search = formValues.search.trim();
    }
    if (formValues.state) {
      queryParams.state = formValues.state;
    }
    if (formValues.party) {
      queryParams.party = formValues.party;
    }
    if (formValues.chamber) {
      queryParams.chamber = formValues.chamber;
    }
    // Pagination
    queryParams.page = this.pageIndex || 0;
    queryParams.pageSize = this.pageSize;

    // Update URL without triggering navigation
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  loadMembers() {
    this.loading = true;

    const formValues = this.searchForm.value;
    const searchParams: MemberSearchParams = {
      limit: this.pageSize,
      offset: this.pageIndex * this.pageSize
    };

    // Only include non-empty values
    if (formValues.search?.trim()) {
      searchParams.search = formValues.search.trim();
    }
    if (formValues.state) {
      searchParams.state = formValues.state;
    }
    if (formValues.party) {
      searchParams.party = formValues.party;
    }
    if (formValues.chamber) {
      searchParams.chamber = formValues.chamber;
    }

    this.membersService.getMembers(searchParams).subscribe({
      next: (response) => {
        this.members = response.members || [];
        this.totalMembers = this.members.length; // TODO: Get from API pagination
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading members:', error);
        // For now, show empty results on error
        this.members = [];
        this.loading = false;
      }
    });
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateQueryParams();
    this.loadMembers();
  }
}
