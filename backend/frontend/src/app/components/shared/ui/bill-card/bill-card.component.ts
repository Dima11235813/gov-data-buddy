import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent {
  @Input() bill: any;

  constructor(private router: Router) {}

  get statusLabel(): string {
    const text: string = this.bill?.latestAction?.text || '';
    if (!text) return 'Introduced';
    const lower = text.toLowerCase();
    if (lower.includes('signed into law') || lower.includes('became public law') || lower.includes('enacted')) return 'Enacted';
    if (lower.includes('passed house')) return 'Passed House';
    if (lower.includes('committee')) return 'In Committee';
    return 'Introduced';
  }

  viewDetails(): void {
    if (this.bill?.congress && this.bill?.type && this.bill?.number) {
      this.router.navigate(['/bills/details', this.bill.congress, this.bill.type, this.bill.number]);
    } else {
      // Fallback to external URL if bill details are not available
      if (this.bill?.url) {
        window.open(this.bill.url, '_blank', 'noopener');
      }
    }
  }
}


