import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material/material.module';

import { PageHeaderComponent } from './page-header/page-header.component';
import { AgencyTableCardComponent } from './agency-table-card/agency-table-card.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { ButtonCardComponent } from './ui/button-card/button-card.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    AgencyTableCardComponent,
    NavigationComponent,
    SiteFooterComponent,
    ButtonCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    PageHeaderComponent,
    AgencyTableCardComponent,
    NavigationComponent,
    SiteFooterComponent,
    ButtonCardComponent
  ]
})
export class SharedComponentsModule { }
