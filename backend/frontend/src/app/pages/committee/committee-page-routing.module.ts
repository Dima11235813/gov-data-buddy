import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitteePageComponent } from './committee-page.component';

const routes: Routes = [
  {
    path: '',
    component: CommitteePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommitteePageRoutingModule { }
