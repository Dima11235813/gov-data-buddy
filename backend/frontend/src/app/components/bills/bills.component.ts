import { Component, OnInit } from '@angular/core';
import { BillDto, BillPropEnum } from '@shared/Bill.model';
import { BillDtoHelper } from 'src/app/domain/dto-helpers/bill-dto.helper';
import { BillsService } from 'src/app/service/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  bills: BillDto[] = [];
  billDetails: any;
  displayedColumns: BillPropEnum[] = Object.values(BillPropEnum)

  /** We're doing a custom template column for latest action */
  iterationProps: BillPropEnum[] = this.displayedColumns.filter(p => p !== BillPropEnum.latestAction) ?? []
  summary: any;
  constructor(private billsService: BillsService) { }

  getProperty = (bill: BillDto, prop: BillPropEnum) => {
    if (BillDtoHelper.propIsDate(prop)) {
      return BillDtoHelper.getTimeDisplayString(bill, prop)
    } else if (BillDtoHelper.propContainsDateWithNotNeededData(prop)) {
      return BillDtoHelper.getTimeFromQuery(bill)
    }
    else {
      return bill[prop]
    }
  }

  ngOnInit(): void {
    this.billsService.getBills().subscribe((data) => {
      this.bills = data;
    });
  }

  shouldRenderLink = (p: string): boolean => {
    return p === BillPropEnum.url
  }

  handleUrlClick = (bill: BillDto): void => {
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
