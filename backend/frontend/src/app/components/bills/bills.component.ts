import { Component, OnInit } from '@angular/core';
import { BillsService } from 'src/app/service/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  bills: any[] = [];
  loading: boolean = true;

  constructor(private billsService: BillsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.billsService.getBills().subscribe({
      next: (data) => {
        this.bills = data || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bills:', error);
        this.bills = [];
        this.loading = false;
      }
    });
  }
}
