import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material/material.module';

import { BillsPageComponent } from './bills-page.component';
import { BillsComponent } from '../../components/bills/bills.component';
// import { SharedComponentsModule } from '../../components/shared/shared-components.module';

@NgModule({
  declarations: [
    BillsPageComponent,
    BillsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
    // SharedComponentsModule
  ]
})
export class BillsPageModule { }
