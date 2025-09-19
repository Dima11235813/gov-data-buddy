import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bills-page',
  templateUrl: './bills-page.component.html',
  styleUrls: ['./bills-page.component.scss']
})
export class BillsPageComponent implements OnInit {
  pageHeading = "Bills Database";
  pageSubtitle = "Search and explore U.S. Congressional bills with detailed information, summaries, and real-time status updates.";

  constructor() { }

  ngOnInit(): void {
  }

}
