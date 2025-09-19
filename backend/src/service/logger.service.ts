import winston from 'winston';

// Define log levels following NestJS convention
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose'
}

// Interface for structured logging context
export interface LogContext {
  userId?: string;
  requestId?: string;
  bioguideId?: string;
  endpoint?: string;
  operation?: string;
  duration?: number;
  cache?: {
    hit?: boolean;
    source?: 'runtime' | 'database' | 'api' | 'service';
    ttl?: number;
    size?: number;
    key?: string;
    age?: number;
    previousSize?: number;
    cleanedCount?: number;
    warmupCount?: number;
    type?: string;
    environment?: string;
    clearedCount?: number;
    options?: any;
  };
  database?: {
    query?: string;
    duration?: number;
    rowsAffected?: number;
  };
  api?: {
    url?: string;
    method?: string;
    statusCode?: number;
    responseTime?: number;
  };
  [key: string]: any;
}

// Logger service following NestJS best practices
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isTest = process.env.NODE_ENV === 'test';

    this.logger = winston.createLogger({
      level: isTest ? 'error' : (process.env.LOG_LEVEL || 'info'),
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ timestamp, level, message, context, stack, ...meta }) => {
          let logMessage = `${timestamp} [${level.toUpperCase()}]: ${message}`;

          if (context) {
            logMessage += ` | Context: ${JSON.stringify(context)}`;
          }

          if (meta && Object.keys(meta).length > 0) {
            logMessage += ` | Meta: ${JSON.stringify(meta)}`;
          }

          if (stack) {
            logMessage += `\n${stack}`;
          }

          return logMessage;
        })
      ),
      transports: [
        // Console transport for all environments
        new winston.transports.Console({
          format: isDevelopment
            ? winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
              )
            : winston.format.json()
        }),

        // File transport for production/persistent logging
        ...(isDevelopment ? [] : [
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.json()
          }),
          new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.json()
          })
        ])
      ],
      exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' })
      ],
      rejectionHandlers: [
        new winston.transports.File({ filename: 'logs/rejections.log' })
      ]
    });

    // Ensure logs directory exists
    if (!isTest && !isDevelopment) {
      const fs = require('fs');
      const path = require('path');
      const logsDir = path.join(process.cwd(), 'logs');
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }
    }
  }

  // Core logging methods
  error(message: string, context?: LogContext, error?: Error): void {
    this.logger.error(message, {
      context,
      ...(error && { stack: error.stack })
    });
  }

  warn(message: string, context?: LogContext, error?: Error): void {
    this.logger.warn(message, {
      context,
      ...(error && { stack: error.stack })
    });
  }

  info(message: string, context?: LogContext): void {
    this.logger.info(message, { context });
  }

  debug(message: string, context?: LogContext): void {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: LogContext): void {
    this.logger.verbose(message, { context });
  }

  // Specialized logging methods for common patterns
  logCacheHit(operation: string, key: string, source: 'runtime' | 'database', context?: LogContext): void {
    this.info(`Cache HIT: ${operation}`, {
      ...context,
      operation,
      cache: { hit: true, source },
      bioguideId: key
    });
  }

  logCacheMiss(operation: string, key: string, context?: LogContext): void {
    this.info(`Cache MISS: ${operation}`, {
      ...context,
      operation,
      cache: { hit: false },
      bioguideId: key
    });
  }

  logDatabaseQuery(operation: string, query: string, duration: number, context?: LogContext): void {
    this.debug(`Database Query: ${operation}`, {
      ...context,
      operation,
      database: { query, duration }
    });
  }

  logApiCall(url: string, method: string, statusCode: number, responseTime: number, context?: LogContext): void {
    const level = statusCode >= 400 ? 'warn' : 'info';
    this.logger.log(level, `API Call: ${method} ${url}`, {
      ...context,
      api: { url, method, statusCode, responseTime }
    });
  }

  logPerformance(operation: string, duration: number, context?: LogContext): void {
    const level = duration > 1000 ? 'warn' : 'debug';
    this.logger.log(level, `Performance: ${operation} took ${duration}ms`, {
      ...context,
      operation,
      duration
    });
  }

  // Request logging utility
  logRequest(req: any, res: any, next: any): void {
    const startTime = Date.now();
    const requestId = this.generateRequestId();

    // Add request ID to response for tracking
    (res as any).requestId = requestId;

    this.info(`Incoming Request: ${req.method} ${req.originalUrl}`, {
      requestId,
      endpoint: req.originalUrl,
      method: req.method,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });

    // Log response when finished
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const level = res.statusCode >= 400 ? 'warn' : 'info';

      this.logger.log(level, `Request Completed: ${req.method} ${req.originalUrl}`, {
        requestId,
        endpoint: req.originalUrl,
        method: req.method,
        statusCode: res.statusCode,
        duration,
        contentLength: res.get('Content-Length')
      });
    });

    next();
  }

  private generateRequestId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// Export singleton instance
export const logger = new LoggerService();
