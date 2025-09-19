import { Component } from '@angular/core';

@Component({
  selector: 'app-members-page',
  template: `
    <div class="members-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .members-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }
  `]
})
export class MembersPageComponent { }
