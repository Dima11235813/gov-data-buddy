import { TestBed } from '@angular/core/testing';
import { MockAppConfigService } from '../app-config/app-config.mock';
import { AppConfigService } from '../app-config/app-config.service';

import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let service: LoggingService;
  let stubAppConfig: MockAppConfigService

  beforeEach(() => {
    stubAppConfig = new MockAppConfigService()
    service = new LoggingService(stubAppConfig as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
