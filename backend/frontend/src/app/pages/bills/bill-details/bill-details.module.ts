import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BillDetailsComponent } from './bill-details.component';
import { BillDetailsRoutingModule } from './bill-details-routing.module';
import { SharedComponentsModule } from '../../../components/shared/shared-components.module';

@NgModule({
  declarations: [BillDetailsComponent],
  imports: [
    CommonModule,
    BillDetailsRoutingModule,
    SharedComponentsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class BillDetailsModule { }
