import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent {
  @Input() bill: any;

  get statusLabel(): string {
    const text: string = this.bill?.latestAction?.text || '';
    if (!text) return 'Introduced';
    const lower = text.toLowerCase();
    if (lower.includes('signed into law') || lower.includes('became public law') || lower.includes('enacted')) return 'Enacted';
    if (lower.includes('passed house')) return 'Passed House';
    if (lower.includes('committee')) return 'In Committee';
    return 'Introduced';
  }
}


