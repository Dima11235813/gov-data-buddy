import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';

import { PageHeaderComponent } from './page-header/page-header.component';
import { AgencyTableCardComponent } from './agency-table-card/agency-table-card.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    AgencyTableCardComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PageHeaderComponent,
    AgencyTableCardComponent,
    NavigationComponent
  ]
})
export class SharedComponentsModule { }
