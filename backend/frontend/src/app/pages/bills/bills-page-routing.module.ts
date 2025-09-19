import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillsPageComponent } from './bills-page.component';

const routes: Routes = [
  {
    path: '',
    component: BillsPageComponent
  },
  {
    path: 'details',
    loadChildren: () => import('./bill-details/bill-details.module').then(m => m.BillDetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillsPageRoutingModule { }
