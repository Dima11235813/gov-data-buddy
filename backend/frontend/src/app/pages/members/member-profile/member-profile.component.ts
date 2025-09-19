import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from '../../../service/members.service';
import { MemberDto } from '../../../../../../shared/Member.model';

@Component({
  selector: 'app-member-profile',
  template: `
    <div class="member-profile" *ngIf="!loading; else loadingTemplate">
      <page-header [pageHeading]="member?.name || 'Member Profile'" [subtitle]="'Congressional Representative'"></page-header>

      <div class="profile-content">
        <div class="profile-header">
          <div class="member-photo">
            <mat-icon class="large-icon">person</mat-icon>
          </div>
          <div class="member-info">
            <h2>{{ member?.name }}</h2>
            <p class="party-state">{{ member?.party }}-{{ member?.state }}</p>
            <p class="district" *ngIf="member?.district">District {{ member?.district }}</p>
            <p class="chamber" *ngIf="!member?.district">United States Senator</p>
          </div>
        </div>

        <div class="profile-sections">
          <mat-card class="info-section">
            <mat-card-header>
              <mat-card-title>Biography</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Biographical information will be displayed here.</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="info-section">
            <mat-card-header>
              <mat-card-title>Committee Assignments</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Committee membership information will be displayed here.</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="info-section">
            <mat-card-header>
              <mat-card-title>Sponsored Legislation</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="bills-list">
                <div class="bill-item" *ngFor="let bill of sponsoredBills">
                  <a [routerLink]="['/bills', bill.id]" class="bill-link">
                    {{ bill.title }}
                  </a>
                  <span class="bill-status">{{ bill.status }}</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="info-section">
            <mat-card-header>
              <mat-card-title>Contact Information</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Contact details will be displayed here.</p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>

    <ng-template #loadingTemplate>
      <div class="loading-container">
        <mat-spinner></mat-spinner>
        <p>Loading member profile...</p>
      </div>
    </ng-template>
  `,
  styles: [`
    .member-profile {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }

    .profile-content {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .profile-header {
      display: flex;
      padding: 24px;
      border-bottom: 1px solid #e0e0e0;
    }

    .member-photo {
      margin-right: 24px;
    }

    .large-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #3f51b5;
    }

    .member-info h2 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .party-state {
      font-weight: 500;
      color: #666;
      margin: 0 0 4px 0;
    }

    .district, .chamber {
      color: #888;
      margin: 0;
    }

    .profile-sections {
      padding: 24px;
    }

    .info-section {
      margin-bottom: 24px;
    }

    .bills-list {
      max-height: 300px;
      overflow-y: auto;
    }

    .bill-item {
      padding: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .bill-link {
      text-decoration: none;
      color: #1976d2;
      flex: 1;
    }

    .bill-link:hover {
      text-decoration: underline;
    }

    .bill-status {
      font-size: 0.8em;
      color: #666;
      background: #f5f5f5;
      padding: 2px 8px;
      border-radius: 12px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px;
    }
  `]
})
export class MemberProfileComponent implements OnInit {
  member: MemberDto | null = null;
  sponsoredBills: any[] = []; // TODO: Define proper bill type
  loading = true;
  bioguideId = '';

  constructor(
    private route: ActivatedRoute,
    private membersService: MembersService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bioguideId = params['bioguideId'];
      this.loadMemberProfile();
    });
  }

  loadMemberProfile() {
    this.loading = true;

    this.membersService.getMemberById(this.bioguideId).subscribe({
      next: (response) => {
        this.member = response.member;
        // TODO: Load sponsored bills separately
        this.sponsoredBills = [
          { id: 'hr1-118', title: 'Sample Bill 1', status: 'Introduced' },
          { id: 'hr2-118', title: 'Sample Bill 2', status: 'Passed House' }
        ];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading member profile:', error);
        // TODO: Handle error state
        this.loading = false;
      }
    });
  }
}
