import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from '../../../service/members.service';
import { MemberDto, Term, LeadershipRole, PartyHistory } from '../../../../../../shared/Member.model';

@Component({
  selector: 'app-member-profile',
  template: `
    <div class="member-profile" *ngIf="!loading && member; else loadingTemplate">
      <page-header [pageHeading]="member.name" [subtitle]="getMemberSubtitle()"></page-header>

      <div class="profile-content">
        <div class="profile-header">
          <div class="member-photo">
            <img
              *ngIf="hasMemberPicture; else placeholderIcon"
              [src]="getMemberPictureUrl()"
              [alt]="member.directOrderName || member.name"
              class="member-image"
              (error)="onImageError($event)"
            />
            <ng-template #placeholderIcon>
              <mat-icon class="large-icon">person</mat-icon>
            </ng-template>
          </div>
          <div class="member-info">
            <h2>{{ member.directOrderName || member.name }}</h2>
            <p class="party-state">{{ getPartyDisplay() }}-{{ member.state }}</p>
            <p class="district" *ngIf="member.district">District {{ member.district }}</p>
            <p class="chamber" *ngIf="!member.district">United States Senator</p>
            <p class="birth-year" *ngIf="member.birthYear">Born: {{ member.birthYear }}</p>
          </div>
        </div>

        <div class="profile-sections">
          <!-- Biography Section -->
          <mat-card class="info-section">
            <mat-card-header>
              <mat-card-title>Biography</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="biography-grid">
                <div class="bio-item" *ngIf="member.honorificName">
                  <strong>Title:</strong> {{ member.honorificName }}
                </div>
                <div class="bio-item" *ngIf="member.firstName">
                  <strong>First Name:</strong> {{ member.firstName }}
                </div>
                <div class="bio-item" *ngIf="member.lastName">
                  <strong>Last Name:</strong> {{ member.lastName }}
                </div>
                <div class="bio-item" *ngIf="member.birthYear">
                  <strong>Birth Year:</strong> {{ member.birthYear }}
                </div>
                <div class="bio-item" *ngIf="member.invertedOrderName">
                  <strong>Formal Name:</strong> {{ member.invertedOrderName }}
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Service History -->
          <mat-card class="info-section" *ngIf="hasServiceHistory">
            <mat-card-header>
              <mat-card-title>Service History</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="service-history">
                <!-- House Service -->
                <div class="chamber-section" *ngIf="houseService.length > 0">
                  <h4>House of Representatives</h4>
                  <div class="service-periods">
                    <div class="service-period" *ngFor="let period of houseService">
                      <span class="years">{{ period.start }} - {{ period.end || 'Present' }}</span>
                    </div>
                  </div>
                </div>

                <!-- Senate Service -->
                <div class="chamber-section" *ngIf="senateService.length > 0">
                  <h4>Senate</h4>
                  <div class="service-periods">
                    <div class="service-period" *ngFor="let period of senateService">
                      <span class="years">{{ period.start }} - {{ period.end || 'Present' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Leadership Roles -->
          <mat-card class="info-section" *ngIf="member.leadership && member.leadership.length > 0">
            <mat-card-header>
              <mat-card-title>Leadership Roles</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="leadership-list">
                <div class="leadership-item" *ngFor="let role of member.leadership">
                  <strong>{{ role.type }}</strong>
                  <span class="congress">Congress {{ role.congress }}</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Party History -->
          <mat-card class="info-section" *ngIf="member.partyHistory && member.partyHistory.length > 0">
            <mat-card-header>
              <mat-card-title>Party History</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="party-history">
                <div class="party-item" *ngFor="let party of member.partyHistory">
                  <strong>{{ party.partyName }} ({{ party.partyAbbreviation }})</strong>
                  <span class="start-year">Since {{ party.startYear }}</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Legislative Activity -->
          <mat-card class="info-section" *ngIf="member.sponsoredLegislation || member.cosponsoredLegislation">
            <mat-card-header>
              <mat-card-title>Legislative Activity</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="legislation-stats">
                <div class="stat-item" *ngIf="member.sponsoredLegislation">
                  <div class="stat-number">{{ member.sponsoredLegislation.count }}</div>
                  <div class="stat-label">
                    <a [routerLink]="['/members', member.bioguideId, 'sponsored-legislation']" class="legislation-link">
                      Sponsored Bills
                    </a>
                  </div>
                </div>
                <div class="stat-item" *ngIf="member.cosponsoredLegislation">
                  <div class="stat-number">{{ member.cosponsoredLegislation.count }}</div>
                  <div class="stat-label">
                    <a [routerLink]="['/members', member.bioguideId, 'cosponsored-legislation']" class="legislation-link">
                      Co-sponsored Bills
                    </a>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Committee Assignments -->
          <mat-card class="info-section">
            <mat-card-header>
              <mat-card-title>Committee Assignments</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Committee membership information will be displayed here.</p>
              <p class="note">* Integration with committee API pending</p>
            </mat-card-content>
          </mat-card>

          <!-- Contact Information -->
          <mat-card class="info-section">
            <mat-card-header>
              <mat-card-title>Contact Information</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="contact-info">
                <p><strong>Congress.gov Profile:</strong></p>
                <a [href]="member.url" target="_blank" class="external-link">
                  View on Congress.gov
                  <mat-icon class="small-icon">open_in_new</mat-icon>
                </a>
              </div>
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
      flex-shrink: 0;
    }

    .member-image {
      width: 120px;
      height: 150px;
      object-fit: cover;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .large-icon {
      font-size: 120px;
      width: 120px;
      height: 150px;
      color: #3f51b5;
    }

    .member-info h2 {
      margin: 0 0 8px 0;
      color: #333;
      font-size: 2rem;
    }

    .party-state {
      font-weight: 500;
      color: #666;
      margin: 0 0 4px 0;
      font-size: 1.1rem;
    }

    .district, .chamber, .birth-year {
      color: #888;
      margin: 2px 0;
      font-size: 0.9rem;
    }

    .profile-sections {
      padding: 24px;
    }

    .info-section {
      margin-bottom: 24px;
    }

    .biography-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    .bio-item {
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .bio-item:last-child {
      border-bottom: none;
    }

    .service-history {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .chamber-section h4 {
      margin: 0 0 12px 0;
      color: #3f51b5;
      font-weight: 500;
    }

    .service-periods {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .service-period {
      padding: 8px 12px;
      background: #f8f9fa;
      border-radius: 4px;
      border-left: 4px solid #3f51b5;
    }

    .years {
      font-weight: 500;
      color: #333;
    }

    .terms-list, .leadership-list, .party-history {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .term-item, .leadership-item, .party-item {
      padding: 12px;
      background: #f8f9fa;
      border-radius: 4px;
      border-left: 4px solid #3f51b5;
    }

    .term-header {
      font-weight: 500;
      margin-bottom: 4px;
    }

    .term-details, .congress, .start-year {
      font-size: 0.9rem;
      color: #666;
    }

    .legislation-stats {
      display: flex;
      gap: 24px;
      justify-content: center;
    }

    .stat-item {
      text-align: center;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
      min-width: 120px;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #3f51b5;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #666;
    }

    .contact-info {
      padding: 16px 0;
    }

    .external-link {
      display: inline-flex;
      align-items: center;
      color: #1976d2;
      text-decoration: none;
      padding: 8px 12px;
      border: 1px solid #1976d2;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .external-link:hover {
      background-color: #f3f9ff;
      text-decoration: none;
    }

    .small-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      margin-left: 4px;
    }

    .note {
      font-style: italic;
      color: #888;
      margin-top: 8px;
    }

    .legislation-link {
      color: #3f51b5;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .legislation-link:hover {
      color: #303f9f;
      text-decoration: underline;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .profile-header {
        flex-direction: column;
        text-align: center;
      }

      .member-photo {
        margin-right: 0;
        margin-bottom: 16px;
      }

      .biography-grid {
        grid-template-columns: 1fr;
      }

      .legislation-stats {
        flex-direction: column;
        align-items: center;
      }

      .stat-item {
        width: 100%;
        max-width: 200px;
      }
    }
  `]
})
export class MemberProfileComponent implements OnInit {
  member: MemberDto | null = null;
  loading = true;
  bioguideId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading member profile:', error);
        this.loading = false;
        // TODO: Add proper error handling with user feedback
      }
    });
  }

  getMemberSubtitle(): string {
    if (!this.member) return 'Congressional Representative';

    const party = this.getPartyDisplay();
    const state = this.member.state;
    const chamber = this.member.district ? 'Representative' : 'Senator';

    return `${party} ${chamber} from ${state}`;
  }

  getPartyDisplay(): string {
    if (!this.member) return '';

    // Extract party from partyHistory if available, otherwise use the main party field
    if (this.member.partyHistory && this.member.partyHistory.length > 0) {
      const currentParty = this.member.partyHistory[this.member.partyHistory.length - 1];
      return currentParty.partyName;
    }

    return this.member.party || 'Unknown';
  }

  get hasMemberPicture(): boolean {
    return !!(this.member?.currentPicture?.base64Data);
  }

  get hasServiceHistory(): boolean {
    return !!(this.member?.served?.House?.length || this.member?.served?.Senate?.length);
  }

  get houseService(): any[] {
    return this.member?.served?.House || [];
  }

  get senateService(): any[] {
    return this.member?.served?.Senate || [];
  }

  getMemberPictureUrl(): string {
    // Return base64 data directly if available
    if (this.member?.currentPicture?.base64Data) {
      return this.member.currentPicture.base64Data;
    }

    // Fallback to placeholder if no picture data
    return '';
  }

  onImageError(event: any) {
    // Hide the broken image and show the placeholder icon
    event.target.style.display = 'none';
    const placeholder = event.target.parentElement.querySelector('.large-icon');
    if (placeholder) {
      placeholder.style.display = 'block';
    }
  }
}
