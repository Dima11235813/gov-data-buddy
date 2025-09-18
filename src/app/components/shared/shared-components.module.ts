

@NgModule({
  declarations: [
    PageHeaderComponent,
    AgencyTableCardComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    PageHeaderComponent,
    AgencyTableCardComponent,
    NavigationComponent
  ]
})
export class SharedComponentsModule { }