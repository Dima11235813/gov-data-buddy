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
  billDetails: any;
  displayedColumns: string[] = Object.values(BillPropEnum)

  /** We're doing a custom template column for latest action */
  iterationProps = this.displayedColumns.filter(p => p !== BillPropEnum.latestAction)
  summary: any;

  constructor(private billsService: BillsService) { }

  ngOnInit(): void {
    this.billsService.getBills().subscribe((data) => {
      this.bills = data;
    });
  }

  shouldRenderLink = (p: string): boolean => {
    return p === BillPropEnum.url
  }

  handleUrlClick = (bill: IBill): void => {
    console.log(`Fetching data for ${bill[BillPropEnum.url]}`)
    this.billsService.getBillDetails(bill[BillPropEnum.url]).subscribe(this.handleBillDetails);
  }

  handleBillDetails = (data: any) => {
    this.billDetails = data;
    // TODO Note that if bill is type s then it has summary if it's type
    // type: "HR"
    // It doesn't have a summary
    if (this.billDetails.bill.summaries) {
      const uri = this.billDetails.bill.summaries.url.split('bill')[1]
      console.log(`Url for details bill summary is ${uri}`)
      this.billsService.getBillSummary(uri).subscribe(this.handleBillSummary)
    }
  }
  handleBillSummary = (data: any) => {
    this.summary = data;
  }
}
