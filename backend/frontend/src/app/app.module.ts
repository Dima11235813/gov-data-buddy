import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { SharedComponentsModule } from './components/shared/shared-components.module';
import { FriendlyTimePipe } from './pipe/display-time-ago.pipe';
import { AppConfigService } from './service/app-config/app-config.service';
import { LoggingService } from './service/logging/logging.service';
import { ErrorService } from './service/error/error.service';
// import { SharedComponentsModule } from './components/shared/shared-components.module';

export const initConfig = (configService: AppConfigService) => configService.init

@NgModule({
  declarations: [
    AppComponent,
    //PIPES
    FriendlyTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SharedComponentsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfigService],
      multi: true,
    },
    LoggingService,
    {
      provide: ErrorHandler,
      useClass: ErrorService,

    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
