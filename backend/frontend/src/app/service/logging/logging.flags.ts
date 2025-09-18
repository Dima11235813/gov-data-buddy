import { LogLevels } from './logging.model';

export interface ILoggingFlags {
    auth: LogLevels,
    routing: LogLevels
}

export const loggingFlags: ILoggingFlags = {
    auth: LogLevels.MINIMAL,
    routing: LogLevels.MINIMAL
}