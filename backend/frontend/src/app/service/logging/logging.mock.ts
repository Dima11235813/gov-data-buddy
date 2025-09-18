export const logLocallyFnName = "logLocally"

export class MockLoggingService {
  key: string = "mock-app-insights-key"
  env: string = "test"
  // appInsights: ApplicationInsights;
  constructor(
  ) {
  }
  init(){

  }
  logLocally() {

  }
  shouldLog() {

  }
  logPageView(name?: string, url?: string) {
  }


  logEvent(name: string, properties?: { [key: string]: any }) {

  }

  logMetric(name: string, average: number, properties?: { [key: string]: any }) {

  }

  logException(exception: Error, severityLevel?: number) {

  }

  logTrace(message: string, properties?: { [key: string]: any }) {

  }
  isLocal(): boolean {
    return true
  }
}