import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';

import { PageHeaderComponent } from './page-header/page-header.component';
import { AgencyTableCardComponent } from './agency-table-card/agency-table-card.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { ButtonCardComponent } from './ui/button-card/button-card.component';
import { SearchInputComponent } from './ui/search-input/search-input.component';
import { StatusSelectComponent } from './ui/status-select/status-select.component';
import { BillCardComponent } from './ui/bill-card/bill-card.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    AgencyTableCardComponent,
    NavigationComponent,
    SiteFooterComponent,
    ButtonCardComponent,
    SearchInputComponent,
    StatusSelectComponent,
    BillCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    PageHeaderComponent,
    AgencyTableCardComponent,
    NavigationComponent,
    SiteFooterComponent,
    ButtonCardComponent,
    SearchInputComponent,
    StatusSelectComponent,
    BillCardComponent
  ]
})
export class SharedComponentsModule { }
