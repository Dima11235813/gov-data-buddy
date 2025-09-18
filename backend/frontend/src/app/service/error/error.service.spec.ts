import { MockLoggingService } from '../logging/logging.mock';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;
  let stubLogger: MockLoggingService

  beforeEach(() => {
    stubLogger = new MockLoggingService()
    service = new ErrorService(stubLogger as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
