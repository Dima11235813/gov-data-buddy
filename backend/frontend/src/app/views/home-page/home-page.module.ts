import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

//Reducers
import { counterReducer } from 'src/app/reducers/counter.reducer';

//components
import { DemoButtonComponent } from 'src/app/components/demo-button/demo-button.component';
import { DemoCounterComponent } from 'src/app/components/demo-counter/demo-counter.component';
import { HomePageComponent } from './home-page.component';

//Services
import { homePageRoutes } from './home-page.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgencyTableCardComponent } from 'src/app/components/agency-table-card/agency-table-card.component';
import { agencyReducer } from 'src/app/reducers/agency.reducer';

@NgModule({
  declarations: [
    HomePageComponent,
    DemoButtonComponent,
    DemoCounterComponent,
    AgencyTableCardComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forRoot(
      {
        count: counterReducer,
        agencies: agencyReducer
      }),
    RouterModule.forChild(homePageRoutes)
  ],
  providers: [
  ],
  exports: [
    HomePageComponent,
    SharedModule
  ]
})
export class HomePageModule { }
