import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { BillStatusFilter } from '../shared/ui/status-select/status-select.component';
import { BillsService } from 'src/app/service/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit, OnDestroy {
  bills: any[] = [];
  loading: boolean = true;
  error: boolean = false;
  searchQuery: string = '';
  statusFilter: BillStatusFilter = 'All';
  filteredBills: any[] = [];

  private destroy$ = new Subject<void>();
  private searchUpdates$ = new Subject<string>();

  constructor(
    private billsService: BillsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize from query params
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const q = (params.get('q') || '').trim();
      const statusParam = (params.get('status') || 'All') as BillStatusFilter;
      const allowed: BillStatusFilter[] = ['All', 'Enacted', 'Passed House', 'In Committee', 'Introduced'];
      this.statusFilter = allowed.includes(statusParam) ? statusParam : 'All';
      this.searchQuery = q;
      this.applyFilters();
    });

    // Debounce URL updates for search
    this.searchUpdates$.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe(value => {
      this.updateQueryParams({ q: value || null });
    });

    this.loadBills();
  }

  onSearchChange(value: string): void {
    this.searchQuery = (value || '');
    this.searchUpdates$.next(this.searchQuery);
    this.applyFilters();
  }

  onStatusChange(value: BillStatusFilter): void {
    this.statusFilter = value;
    this.updateQueryParams({ status: value === 'All' ? null : value });
    this.applyFilters();
  }

  private applyFilters(): void {
    const matchesSearch = (bill: any): boolean => {
      if (!this.searchQuery) return true;
      const haystack = `${bill?.title ?? ''} ${bill?.number ?? ''}`.toLowerCase();
      return haystack.includes(this.searchQuery);
    };

    const statusOf = (bill: any): 'Enacted' | 'Passed House' | 'In Committee' | 'Introduced' => {
      const text: string = bill?.latestAction?.text || '';
      const lower = text.toLowerCase();
      if (lower.includes('signed into law') || lower.includes('became public law') || lower.includes('enacted')) return 'Enacted';
      if (lower.includes('passed house')) return 'Passed House';
      if (lower.includes('committee')) return 'In Committee';
      return 'Introduced';
    };

    const matchesStatus = (bill: any): boolean => {
      if (this.statusFilter === 'All') return true;
      return statusOf(bill) === this.statusFilter;
    };

    this.filteredBills = (this.bills || []).filter(b => matchesSearch(b) && matchesStatus(b));
  }

  onRetry(): void {
    this.loadBills();
  }

  private loadBills(): void {
    this.loading = true;
    this.error = false;
    this.billsService.getBills().subscribe({
      next: (data) => {
        this.bills = data || [];
        this.applyFilters();
        this.loading = false;
        this.error = false;
      },
      error: (error) => {
        console.error('Error loading bills:', error);
        this.bills = [];
        this.applyFilters();
        this.loading = false;
        this.error = true;
      }
    });
  }

  private updateQueryParams(params: { q?: string | null; status?: string | null }): void {
    const queryParams: any = {};
    if (params.q !== undefined) queryParams.q = params.q || null;
    if (params.status !== undefined) queryParams.status = params.status || null;
    this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
