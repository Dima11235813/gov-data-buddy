import { Component, OnInit } from '@angular/core';

interface Agency {
  name: string;
  type: string;
  status: string;
}

@Component({
  selector: 'app-agency-table-card',
  templateUrl: './agency-table-card.component.html',
  styleUrls: ['./agency-table-card.component.scss']
})
export class AgencyTableCardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'status', 'actions'];

  agencies: Agency[] = [
    {
      name: 'Congressional Budget Office',
      type: 'Legislative Branch',
      status: 'Active'
    },
    {
      name: 'Government Accountability Office',
      type: 'Legislative Branch',
      status: 'Active'
    },
    {
      name: 'Office of Management and Budget',
      type: 'Executive Branch',
      status: 'Active'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'primary';
      case 'inactive':
        return 'warn';
      default:
        return 'accent';
    }
  }

  viewDetails(agency: Agency): void {
    console.log('Viewing details for:', agency);
    // TODO: Implement navigation to agency details
  }
}
