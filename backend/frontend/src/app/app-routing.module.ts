import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'bills',
    loadChildren: () => import('./pages/bills/bills-page.module').then(m => m.BillsPageModule)
  },
  {
    path: 'members',
    loadChildren: () => import('./pages/members/members-page.module').then(m => m.MembersPageModule)
  },
  {
    path: 'committee',
    loadChildren: () => import('./pages/committee/committee-page.module').then(m => m.CommitteePageModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
