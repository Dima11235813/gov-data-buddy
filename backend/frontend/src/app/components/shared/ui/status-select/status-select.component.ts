import { Component, EventEmitter, Input, Output } from '@angular/core';

export type BillStatusFilter = 'All' | 'Enacted' | 'Passed House' | 'In Committee' | 'Introduced';

@Component({
  selector: 'app-status-select',
  templateUrl: './status-select.component.html',
  styleUrls: ['./status-select.component.scss']
})
export class StatusSelectComponent {
  @Input() value: BillStatusFilter = 'All';
  @Output() valueChange = new EventEmitter<BillStatusFilter>();

  options: BillStatusFilter[] = ['All', 'Enacted', 'Passed House', 'In Committee', 'Introduced'];

  onChange(value: BillStatusFilter): void {
    this.value = value;
    this.valueChange.emit(this.value);
  }
}


