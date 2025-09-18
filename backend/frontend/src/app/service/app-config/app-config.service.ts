import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { defaultConfig, IAppConfig } from './app-config.model';


@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  config: IAppConfig = defaultConfig

  constructor(
    private _http: HttpClient
  ) {
  }
  init = () => {
    return this._http.get(`./assets/config.json`)
      .toPromise()
      .then(this.handleAppConfigFromServer);
  }
  handleAppConfigFromServer = (data: any) => {
    this.config = data
    console.log(`Got config from server!`)
  }
  getUseMockData = (): boolean => {
    return this.config?.USE_MOCK_DATA
  }
  getConfig = (): IAppConfig => this.config

  getFullPath = (path: string, method = null): string => {
    return `${this.config.API_URL}${path}`
  }

}
