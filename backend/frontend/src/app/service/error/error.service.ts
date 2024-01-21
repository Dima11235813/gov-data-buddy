import { Injectable, ErrorHandler } from '@angular/core';
import { LoggingService } from '../logging/logging.service';
import { ExceptionSeverity } from './error.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService extends ErrorHandler {

  constructor(
    private _logger: LoggingService
  ) {
    super()
  }
  override handleError(error: Error | HttpErrorResponse) {
    console.log(`
    Error
    error instanceof HttpErrorResponse ${error instanceof HttpErrorResponse}

    `)
    console.log(error)
    if (
      error instanceof HttpErrorResponse &&
      (
        error.status === 400 ||
        error.status === 401
      )
    ) {
      console.log(`Status code of ${error.status}`)
    }else{
      this._logger.logException(error, ExceptionSeverity.High)
    }
  }
}
