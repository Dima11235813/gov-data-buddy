import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { MembersPageComponent } from './members-page.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MemberDirectoryComponent } from './member-directory/member-directory.component';
import { SharedComponentsModule } from '../../components/shared/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: MembersPageComponent,
    children: [
      {
        path: '',
        component: MemberDirectoryComponent
      },
      {
        path: ':bioguideId',
        component: MemberProfileComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    MembersPageComponent,
    MemberProfileComponent,
    MemberDirectoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedComponentsModule,

    // Angular Material
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDividerModule,
    MatListModule
  ]
})
export class MembersPageModule { }
