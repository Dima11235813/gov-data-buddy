import { Component, OnInit } from '@angular/core';
import { BillPropEnum, IBill } from '@shared/Bill.model';
import { BillsService } from '../services/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  bills: IBill[] = [];
  displayedColumns: string[] = Object.values(BillPropEnum)

  /** We're doing a custom template column for latest action */
  iterationProps = this.displayedColumns.filter(p => p !== BillPropEnum.latestAction)

  shouldRenderLink = (p: string): boolean => {
    return p === BillPropEnum.url
  }

  handleUrlClick = (url: string, bill: IBill): void => {
    console.log(`Fetching data for ${bill[BillPropEnum.url]}`)
  }

  constructor(private billsService: BillsService) { }

  ngOnInit(): void {
    this.billsService.getBills().subscribe((data) => {
      this.bills = data;
    });
  }
}
