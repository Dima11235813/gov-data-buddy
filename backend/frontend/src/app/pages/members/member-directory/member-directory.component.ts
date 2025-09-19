import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MembersService, MemberSearchParams, MemberSearchResponse } from '../../../service/members.service';
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

        <mat-form-field appearance="outline">
          <mat-label>From Date</mat-label>
          <input matInput [matDatepicker]="fromPicker" formControlName="fromDateTime">
          <mat-datepicker-toggle matIconSuffix [for]="fromPicker"></mat-datepicker-toggle>
          <mat-datepicker #fromPicker></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>To Date</mat-label>
          <input matInput [matDatepicker]="toPicker" formControlName="toDateTime">
          <mat-datepicker-toggle matIconSuffix [for]="toPicker"></mat-datepicker-toggle>
          <mat-datepicker #toPicker></mat-datepicker>
        </mat-form-field>
      </form>

      <!-- Desktop Table View -->
      <div class="table-container" *ngIf="!loading && members.length > 0; else loadingTemplate">
        <table mat-table [dataSource]="members" class="members-table" matSort>

          <!-- Photo Column -->
          <ng-container matColumnDef="photo">
            <th mat-header-cell *matHeaderCellDef>Photo</th>
            <td mat-cell *matCellDef="let member">
              <div class="member-avatar">
                <img
                  *ngIf="member.currentPicture?.base64Data; else personIcon"
                  [src]="member.currentPicture!.base64Data"
                  [alt]="member.name"
                  class="member-thumbnail"
                  (error)="onImageError($event)"
                />
                <ng-template #personIcon>
                  <mat-icon>person</mat-icon>
                </ng-template>
              </div>
            </td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
            <td mat-cell *matCellDef="let member" [routerLink]="['/members', member.bioguideId]" class="clickable-cell">
              {{ member.name }}
            </td>
          </ng-container>

          <!-- Party Column -->
          <ng-container matColumnDef="party">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Party</th>
            <td mat-cell *matCellDef="let member" [routerLink]="['/members', member.bioguideId]" class="clickable-cell">
              {{ member.party }}
            </td>
          </ng-container>

          <!-- State Column -->
          <ng-container matColumnDef="state">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>State</th>
            <td mat-cell *matCellDef="let member" [routerLink]="['/members', member.bioguideId]" class="clickable-cell">
              {{ member.state }}
            </td>
          </ng-container>

          <!-- District/Chamber Column -->
          <ng-container matColumnDef="district">
            <th mat-header-cell *matHeaderCellDef>District</th>
            <td mat-cell *matCellDef="let member" [routerLink]="['/members', member.bioguideId]" class="clickable-cell">
              <span *ngIf="member.district">District {{ member.district }}</span>
              <span *ngIf="!member.district">Senator</span>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>

      <!-- Mobile Card View -->
      <div class="members-grid mobile-only" *ngIf="!loading && members.length > 0">
        <mat-card class="member-card" *ngFor="let member of members" [routerLink]="['/members', member.bioguideId]">
          <mat-card-header>
            <div mat-card-avatar class="member-avatar">
              <img
                *ngIf="member.currentPicture?.base64Data; else personIcon"
                [src]="member.currentPicture!.base64Data"
                [alt]="member.name"
                class="member-thumbnail"
                (error)="onImageError($event)"
              />
              <ng-template #personIcon>
                <mat-icon>person</mat-icon>
              </ng-template>
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
        <!-- Table skeleton for desktop -->
        <div class="table-skeleton" *ngIf="!loading">
          <table class="members-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Party</th>
                <th>State</th>
                <th>District</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let s of [].constructor(12)">
                <td><div class="skeleton-avatar"></div></td>
                <td><div class="skeleton-line"></div></td>
                <td><div class="skeleton-line short"></div></td>
                <td><div class="skeleton-line short"></div></td>
                <td><div class="skeleton-line"></div></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Card skeleton for mobile -->
        <div class="loading-container mobile-only">
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
        *ngIf="members.length > 0"
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
      grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .search-field {
      grid-column: 1;
    }

    /* Desktop Table Styles */
    .table-container {
      overflow-x: auto;
      margin-bottom: 24px;
      min-height: 50vh;
    }

    .members-table {
      width: 100%;
      border-collapse: collapse;
    }

    .member-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      background-color: #3f51b5;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .member-thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .clickable-cell {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .clickable-cell:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    /* Hide table on mobile */
    @media (max-width: 768px) {
      .table-container,
      .table-skeleton {
        display: none;
      }
    }

    /* Table skeleton styles */
    .table-skeleton {
      overflow-x: auto;
      margin-bottom: 24px;
    }

    .table-skeleton table {
      width: 100%;
      border-collapse: collapse;
    }

    .table-skeleton th,
    .table-skeleton td {
      padding: 16px;
      text-align: left;
    }

    .table-skeleton th {
      border-bottom: 1px solid #e0e0e0;
      font-weight: 500;
    }

    /* Mobile Card Styles */
    .members-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
      min-height: 50vh;
    }

    /* Hide cards on desktop */
    @media (min-width: 769px) {
      .members-grid,
      .loading-container {
        display: none;
      }
    }

    .member-card {
      cursor: pointer;
      transition: transform 0.2s;
    }

    .member-card:hover {
      transform: translateY(-4px);
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
  displayedColumns: string[] = ['photo', 'name', 'party', 'state', 'district'];
  private knownTotal = false;

  constructor(
    private fb: FormBuilder,
    private membersService: MembersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Set default date range to last year
    const today = new Date();
    const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    this.searchForm = this.fb.group({
      search: [''],
      state: [''],
      party: [''],
      chamber: [''],
      fromDateTime: [lastYear.toISOString().split('T')[0]], // YYYY-MM-DD format
      toDateTime: [today.toISOString().split('T')[0]]
    });
  }

  ngOnInit() {
    // Initialize form from query parameters
    this.route.queryParams.subscribe(params => {
      this.searchForm.patchValue({
        search: params['search'] || '',
        state: params['state'] || '',
        party: params['party'] || '',
        chamber: params['chamber'] || '',
        fromDateTime: params['fromDateTime'] ? new Date(params['fromDateTime']).toISOString().split('T')[0] : this.searchForm.get('fromDateTime')?.value,
        toDateTime: params['toDateTime'] ? new Date(params['toDateTime']).toISOString().split('T')[0] : this.searchForm.get('toDateTime')?.value
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
    if (formValues.fromDateTime) {
      // Store as YYYY-MM-DD format in URL for bookmarking
      queryParams.fromDateTime = formValues.fromDateTime;
    }
    if (formValues.toDateTime) {
      // Store as YYYY-MM-DD format in URL for bookmarking
      queryParams.toDateTime = formValues.toDateTime;
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
    if (formValues.fromDateTime) {
      // Convert YYYY-MM-DD to API format: YYYY-MM-DDT00:00:00Z
      searchParams.fromDateTime = `${formValues.fromDateTime}T00:00:00Z`;
    }
    if (formValues.toDateTime) {
      // Convert YYYY-MM-DD to API format: YYYY-MM-DDT23:59:59Z
      searchParams.toDateTime = `${formValues.toDateTime}T23:59:59Z`;
    }

    this.membersService.getMembers(searchParams).subscribe({
      next: (response: MemberSearchResponse) => {
        this.members = response.members || [];
        const receivedTotal = (response as any)?.pagination?.total;
        this.knownTotal = typeof receivedTotal === 'number' && receivedTotal > 0;
        if (this.knownTotal) {
          this.totalMembers = receivedTotal;
        } else {
          // Fallback: if we don't know the true total from backend, infer a reasonable length
          // - If page is full, assume at least one more page exists
          // - If page is partial, cap to the items we've seen so far
          if (this.members.length === this.pageSize) {
            this.totalMembers = (this.pageIndex + 2) * this.pageSize;
          } else {
            this.totalMembers = this.pageIndex * this.pageSize + this.members.length;
          }
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading members:', error);
        // For now, show empty results on error
        this.members = [];
        this.totalMembers = 0;
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

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement) {
      imgElement.style.display = 'none';
      const nextSibling = imgElement.nextElementSibling as HTMLElement;
      if (nextSibling) {
        nextSibling.style.display = 'block';
      }
    }
  }
}
