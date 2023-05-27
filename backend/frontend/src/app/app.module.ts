import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BillsComponent } from './components/bills/bills.component';
import { MaterialModule } from './shared/material/material.module';
import { FriendlyTimePipe } from './pipe/display-time-ago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BillsComponent,
    //PIPES
    FriendlyTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
