import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';

import { CommitteePageComponent } from './committee-page.component';
import { CommitteePageRoutingModule } from './committee-page-routing.module';

@NgModule({
  declarations: [CommitteePageComponent],
  imports: [
    CommonModule,
    CommitteePageRoutingModule,
    MaterialModule
  ]
})
export class CommitteePageModule { }
