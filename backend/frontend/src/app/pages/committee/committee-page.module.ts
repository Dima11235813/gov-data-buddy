import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material/material.module';

import { CommitteePageComponent } from './committee-page.component';

@NgModule({
  declarations: [CommitteePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class CommitteePageModule { }
