import { IAppConfig } from './app-config.model';
import { EnvOptions } from './envOptions';

export class MockAppConfigService {
  config?: IAppConfig = undefined

  constructor(
  ) {
  }
  init = () => {
  }
  getUseMockData = () => true
  getConfig = (): IAppConfig | undefined => {
    return {
      "USE_VERBOSE_LOGGING": false,
      "env": EnvOptions.LOCAL,
      "USE_MOCK_DATA": false,

      "SENTRY_INSTRUMENTATION_KEY": "",
      "API_URL": "https://localhost:3000",

      "SESSION_TIMEOUT_TIME": "300000"
    }
  }

}
