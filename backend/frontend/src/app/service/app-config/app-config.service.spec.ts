
import { MockHttpClient } from 'src/app/mock/mockHttpClient';
import { AppConfigService } from './app-config.service';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let stubHttp: MockHttpClient

  beforeEach(() => {
    service = new AppConfigService(
      stubHttp as any
    )
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
