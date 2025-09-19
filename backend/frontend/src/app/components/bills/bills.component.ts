import { Component, OnInit } from '@angular/core';
import { BillStatusFilter } from '../shared/ui/status-select/status-select.component';
import { BillsService } from 'src/app/service/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  bills: any[] = [];
  loading: boolean = true;
  searchQuery: string = '';
  statusFilter: BillStatusFilter = 'All';
  filteredBills: any[] = [];

  constructor(private billsService: BillsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.billsService.getBills().subscribe({
      next: (data) => {
        this.bills = data || [];
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bills:', error);
        this.bills = [];
        this.applyFilters();
        this.loading = false;
      }
    });
  }

  onSearchChange(value: string): void {
    this.searchQuery = (value || '').toLowerCase();
    this.applyFilters();
  }

  onStatusChange(value: BillStatusFilter): void {
    this.statusFilter = value;
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
}
