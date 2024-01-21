import { Injectable, OnInit } from '@angular/core';

//TODO Uncomment when integrating ms azure app insights - or replace with another app analytics option
//3rd party code
// import { ApplicationInsights } from '@microsoft/applicationinsights-web';

//Config
import { loggingFlags } from './logging.flags';
import { LoggingArea, LogLevels } from './logging.model';
import { AppConfigService } from '../app-config/app-config.service';
import { EnvOptions } from '../app-config/envOptions';

//App Insights local dev testing - user to test logging from localhost
// let overrideAndUseAppInsightsLocally = true
let overrideAndUseAppInsightsLocally = false

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  useVerboseLoggingOverride: boolean = false
  // appInsights: ApplicationInsights = {}
  appInsights: any = {}
  key: string = "no-app-insights-key"
  env: EnvOptions = EnvOptions.LOCAL
  constructor(
    private _appConfig: AppConfigService
  ) {
  }
  init = () => {
    this.key = this._appConfig.getConfig().SENTRY_INSTRUMENTATION_KEY
    this.env = this._appConfig.getConfig().env
    this.useVerboseLoggingOverride = this._appConfig.getConfig()?.USE_VERBOSE_LOGGING
    console.log(`
    Logging service instantiating app insights with 
      key: ${this.key}
      env: ${this.env}
      user verbose override: ${this.useVerboseLoggingOverride}
      
      `)
    // this.appInsights = new ApplicationInsights({
    //   config: {
    //     instrumentationKey: this.key,
    //     enableAutoRouteTracking: true // option to log all route changes
    //   }
    // });
    // this.appInsights.loadAppInsights();
  }
  logLocally = (
    message: string,
    area: LoggingArea,
    level: LogLevels
  ): void => {
    this.shouldLog(message, area, level)
  }
  shouldLog = (
    message: string,
    area: LoggingArea,
    level: LogLevels
  ) => {
    //if the logging area is set to verbose then use console log
    //TODO use TS type inference instead of this non scalable solution 
    if (
      this.useVerboseLoggingOverride ||
      (
        (
          level === LogLevels.VERBOSE &&
          area === LoggingArea.AUTH &&
          loggingFlags.auth === LogLevels.VERBOSE
        ) ||
        (
          level === LogLevels.VERBOSE &&
          area === LoggingArea.ROUTING &&
          loggingFlags.routing === LogLevels.VERBOSE
        )
      )
    ) {
      console.log(message)
    }
  }

  logPageView(name?: string, url?: string) {
    if (!this.appInsights) return
    if (this.isLocal()) {
      //TODO Add to verbose logging
      // console.log(`
      // Local pageview logging
      //   name: ${name}
      //   url: ${url}
      // `)
      return
    }
    this.appInsights.trackPageView({
      name: name,
      uri: url
    });
  }

  logEvent(name: string, properties?: { [key: string]: any }) {
    if (!this.appInsights) return
    let stringifiedObject = ""
    try {
      stringifiedObject = JSON.stringify(properties)
    } catch (error) {
      console.warn(`Caught error when stringifying object 
      error: ${error}`)
    }
    if (this.isLocal()) {
      console.log(`
      Local event logging
        name: ${name}
        properties: ${stringifiedObject}
      `)
      return
    }
    this.appInsights.trackEvent({ name: name }, properties);
  }

  logMetric(name: string, average: number, properties?: { [key: string]: any }) {
    if (this.isLocal()) {
      console.info(`
      Logging metric, 
      name ${name}
      average ${average}
      properties ${properties}
      `)
      return
    }
    if (!this.appInsights) return
    this.appInsights.trackMetric({ name: name, average: average }, properties);
    //TODO Do we want to track page load times as metrics?
  }

  logException(exception: Error, severityLevel?: number) {
    if (this.isLocal()) {
      console.info(`Logging exception, message ${exception.message}`)
      console.info(exception)
      return
    }
    if (!this.appInsights) return
    this.appInsights.trackException({ exception: exception, severityLevel: severityLevel });
  }

  logTrace(message: string, properties?: { [key: string]: any }) {
    if (this.isLocal()) {
      console.info(`Local trace logging 
      message: ${message}
      properties: ${properties}
      `)
      return
    }
    if (!this.appInsights) return
    this.appInsights.trackTrace({ message: message }, properties);
  }
  isLocal = (): boolean => {
    return this.env === EnvOptions.LOCAL && !overrideAndUseAppInsightsLocally
  }
}