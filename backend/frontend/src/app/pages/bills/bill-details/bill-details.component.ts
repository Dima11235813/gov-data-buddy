import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BillsService } from '../../../service/bills.service';
import { BillDetailDto } from '../../../../../../shared/BillDetail.model';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit {
  billDetails$: Observable<BillDetailDto | null> = of(null);
  loading = true;
  error: string | null = null;
  pageHeading = 'Bill Details';
  pageSubtitle = 'Comprehensive information about this legislation';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private billsService: BillsService
  ) {}

  ngOnInit(): void {
    const congress = this.route.snapshot.paramMap.get('congress');
    const billType = this.route.snapshot.paramMap.get('billType');
    const billNumber = this.route.snapshot.paramMap.get('billNumber');

    if (congress && billType && billNumber) {
      this.loadBillDetails(congress, billType, billNumber);
    } else {
      this.error = 'Invalid bill parameters';
      this.loading = false;
    }
  }

  private loadBillDetails(congress: string, billType: string, billNumber: string): void {
    this.loading = true;
    this.error = null;

    this.billsService.getBillDetails(congress, billType, billNumber).subscribe({
      next: (details) => {
        this.billDetails$ = of(details);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading bill details:', err);
        this.error = 'Failed to load bill details. Please try again.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/bills']);
  }

  getStatusLabel(latestAction?: any): string {
    if (!latestAction?.text) return 'Introduced';
    const lower = latestAction.text.toLowerCase();
    if (lower.includes('signed into law') || lower.includes('became public law') || lower.includes('enacted')) return 'Enacted';
    if (lower.includes('passed house')) return 'Passed House';
    if (lower.includes('committee')) return 'In Committee';
    return 'Introduced';
  }
}
