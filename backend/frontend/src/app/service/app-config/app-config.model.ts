import { EnvOptions } from './envOptions';

export interface IAppConfig {
  USE_VERBOSE_LOGGING: boolean
  env: EnvOptions
  USE_MOCK_DATA: boolean

  SENTRY_INSTRUMENTATION_KEY: string
  API_URL: string

  SESSION_TIMEOUT_TIME: string
}

export class DefaultConfig implements IAppConfig {
  API_URL = "";
  SENTRY_INSTRUMENTATION_KEY = "";
  SESSION_TIMEOUT_TIME = "";
  USE_MOCK_DATA = false;
  USE_VERBOSE_LOGGING = false;
  env = EnvOptions.LOCAL;

}

export const defaultConfig = new DefaultConfig()