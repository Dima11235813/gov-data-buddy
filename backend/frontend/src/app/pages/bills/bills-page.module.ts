import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { SharedComponentsModule } from '../../components/shared/shared-components.module';

import { BillsPageComponent } from './bills-page.component';
import { BillsComponent } from '../../components/bills/bills.component';
import { BillsPageRoutingModule } from './bills-page-routing.module';
// import { SharedComponentsModule } from '../../components/shared/shared-components.module';

@NgModule({
  declarations: [
    BillsPageComponent,
    BillsComponent
  ],
  imports: [
    CommonModule,
    BillsPageRoutingModule,
    MaterialModule,
    SharedComponentsModule
  ]
})
export class BillsPageModule { }
