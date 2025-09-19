import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from '../../../service/members.service';

@Component({
  selector: 'app-cosponsored-legislation',
  template: `
    <div class="cosponsored-legislation">
      <page-header [pageHeading]="pageTitle" [subtitle]="pageSubtitle"></page-header>

      <div class="legislation-content" *ngIf="!loading; else loadingTemplate">
        <div class="legislation-summary" *ngIf="summary">
          <mat-card class="summary-card">
            <mat-card-content>
              <div class="summary-stats">
                <div class="stat-item">
                  <div class="stat-number">{{ summary.count || 0 }}</div>
                  <div class="stat-label">Total Co-sponsored Bills</div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="bills-list" *ngIf="bills && bills.length > 0">
          <mat-card class="bills-card">
            <mat-card-header>
              <mat-card-title>Co-sponsored Legislation</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="bills-grid">
                <mat-card class="bill-item" *ngFor="let bill of bills" [routerLink]="['/bills', bill.congress, bill.type?.toLowerCase(), bill.number]">
                  <mat-card-header>
                    <mat-card-title>{{ bill.type }}{{ bill.number }} - {{ bill.congress }}</mat-card-title>
                    <mat-card-subtitle>{{ bill.title }}</mat-card-subtitle>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="bill-meta">
                      <span class="bill-date" *ngIf="bill.updateDate">{{ bill.updateDate | date:'shortDate' }}</span>
                      <span class="bill-status" *ngIf="bill.latestAction?.actionDate">
                        Latest Action: {{ bill.latestAction.actionDate | date:'shortDate' }}
                      </span>
                    </div>
                  </mat-card-content>
                </mat-card>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="no-data" *ngIf="!bills || bills.length === 0">
          <mat-card>
            <mat-card-content>
              <p>No co-sponsored legislation found for this member.</p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <ng-template #loadingTemplate>
        <div class="loading-container">
          <mat-spinner></mat-spinner>
          <p>Loading co-sponsored legislation...</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .cosponsored-legislation {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      min-height: calc(100vh - 180px);
    }

    .legislation-content {
      margin-top: 24px;
    }

    .summary-card {
      margin-bottom: 24px;
    }

    .summary-stats {
      display: flex;
      justify-content: center;
    }

    .stat-item {
      text-align: center;
      padding: 20px;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #3f51b5;
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 1.1rem;
      color: #666;
    }

    .bills-card {
      margin-bottom: 24px;
    }

    .bills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }

    .bill-item {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .bill-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .bill-meta {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 8px;
    }

    .bill-date, .bill-status {
      font-size: 0.9rem;
      color: #666;
    }

    .no-data {
      text-align: center;
      margin-top: 48px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px;
      gap: 16px;
    }
  `]
})
export class CosponsoredLegislationComponent implements OnInit {
  bioguideId: string = '';
  pageTitle: string = 'Co-sponsored Legislation';
  pageSubtitle: string = '';
  loading: boolean = true;
  bills: any[] = [];
  summary: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private membersService: MembersService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bioguideId = params['bioguideId'];
      if (this.bioguideId) {
        this.loadCosponsoredLegislation();
      }
    });
  }

  loadCosponsoredLegislation() {
    this.loading = true;
    this.membersService.getMemberCosponsoredLegislation(this.bioguideId).subscribe({
      next: (data) => {
        this.bills = data.cosponsoredLegislation || [];
        this.summary = {
          count: this.bills.length
        };
        this.pageSubtitle = `Bills co-sponsored by ${this.bioguideId}`;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading co-sponsored legislation:', error);
        this.loading = false;
      }
    });
  }
}
