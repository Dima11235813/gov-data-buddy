import { Routes } from '@angular/router';
import { UnauthRouteGuard } from 'src/app/guards/unauth-route-guard';
import { HomePageComponent } from './home-page.component';

export const homePageRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
    canActivate: [UnauthRouteGuard]
  }
];
