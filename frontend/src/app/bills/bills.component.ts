import { Component, OnInit } from '@angular/core';
import { BillsService } from '../services/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  bills: any[] = [];

  displayedColumns: string[] = ['title', 'type', 'originChamber', 'latestAction'];


  constructor(private billsService: BillsService) { }

  ngOnInit(): void {
    this.billsService.getBills().subscribe((data) => {
      this.bills = data;
    });
  }
}
