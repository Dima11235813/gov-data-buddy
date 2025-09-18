import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CommitteeDto, CommitteesResponseDto } from '@shared/Committee.model';
import { CommitteeService } from '../../service/committee.service';
import { AppConfigService } from '../../service/app-config/app-config.service';
import { mockCommitteesResponse } from '../../mock/committee.mock';

@Component({
  selector: 'app-committee-page',
  templateUrl: './committee-page.component.html',
  styleUrls: ['./committee-page.component.scss']
})
export class CommitteePageComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'chamber', 'committeeTypeCode', 'systemCode', 'actions'];
  dataSource = new MatTableDataSource<CommitteeDto>();
  isLoading = false;
  totalCommittees = 0;
  pageSize = 20;
  currentPage = 0;

  chambers = ['All', 'House', 'Senate', 'Joint'];
  selectedChamber = 'All';

  committees$: Observable<CommitteesResponseDto> | null = null;

  constructor(
    private committeeService: CommitteeService,
    private appConfigService: AppConfigService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize with query params from URL
    this.route.queryParams.subscribe(params => {
      this.currentPage = parseInt(params['page'] || '0');
      this.pageSize = parseInt(params['limit'] || '20');
      this.selectedChamber = params['chamber'] || 'All';
      this.loadCommittees();
    });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.page.subscribe((event: PageEvent) => {
        this.onPageChange(event);
      });
    }
  }

  loadCommittees(): void {
    this.isLoading = true;

    const params: any = {
      offset: this.currentPage * this.pageSize,
      limit: this.pageSize
    };

    if (this.selectedChamber !== 'All') {
      params.chamber = this.selectedChamber.toLowerCase();
    }

    if (this.appConfigService.getUseMockData()) {
      // Use mock data
      this.committees$ = new Observable(subscriber => {
        setTimeout(() => {
          subscriber.next(mockCommitteesResponse);
          subscriber.complete();
        }, 500); // Simulate network delay
      });
    } else {
      // Use real API
      this.committees$ = this.committeeService.getCommittees(params);
    }

    this.committees$.subscribe({
      next: (response: CommitteesResponseDto) => {
        this.dataSource.data = response.committees;
        this.totalCommittees = response.pagination?.total || 0;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading committees:', error);
        this.isLoading = false;
        // Fallback to mock data on error
        this.dataSource.data = mockCommitteesResponse.committees;
        this.totalCommittees = mockCommitteesResponse.pagination?.total || 0;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;

    // Update URL query params
    this.updateQueryParams();

    // Load new page
    this.loadCommittees();
  }

  onChamberFilterChange(): void {
    this.currentPage = 0; // Reset to first page when filter changes
    this.updateQueryParams();
    this.loadCommittees();
  }

  updateQueryParams(): void {
    const queryParams: any = {
      page: this.currentPage.toString(),
      limit: this.pageSize.toString()
    };

    if (this.selectedChamber !== 'All') {
      queryParams.chamber = this.selectedChamber;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  viewCommitteeDetails(committee: CommitteeDto): void {
    // Navigate to committee details (to be implemented)
    console.log('View committee details:', committee);
  }

  getChamberIcon(chamber: string): string {
    switch (chamber.toLowerCase()) {
      case 'house':
        return 'account_balance';
      case 'senate':
        return 'gavel';
      case 'joint':
        return 'group_work';
      default:
        return 'business';
    }
  }

  getChamberTooltip(chamber: string): string {
    switch (chamber.toLowerCase()) {
      case 'house':
        return 'House of Representatives Committee';
      case 'senate':
        return 'Senate Committee';
      case 'joint':
        return 'Joint Committee (House & Senate)';
      default:
        return 'Congressional Committee';
    }
  }
}
