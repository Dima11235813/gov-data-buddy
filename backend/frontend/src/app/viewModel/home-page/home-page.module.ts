import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page.component";
import { homePageRoutes } from "./home-page.routing";
import { SharedComponentsModule } from "../../components/shared/shared-components.module";

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homePageRoutes),
    SharedComponentsModule
  ],
  providers: [
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
