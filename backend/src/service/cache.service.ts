import { ICacheService, CacheOptions, ICacheFactory } from './cache.interface';
import { MemoryCacheService } from './memory-cache.service';
import { LoggerService } from './logger.service';

// Environment-based cache factory
export class CacheFactory implements ICacheFactory {
  constructor(private logger: LoggerService) {}

  create(options: CacheOptions = {}): ICacheService {
    const env = process.env.NODE_ENV || 'development';
    const cacheType = process.env.CACHE_TYPE || 'memory';

    // Merge with environment-specific defaults
    const defaultOptions = this.getDefaultOptions(env);
    const mergedOptions = { ...defaultOptions, ...options };

    this.logger.info(`Creating cache service`, {
      operation: 'cache-factory-create',
      cache: {
        type: cacheType,
        environment: env,
        options: mergedOptions
      }
    });

    switch (cacheType.toLowerCase()) {
      case 'memory':
      default:
        return new MemoryCacheService(this.logger, mergedOptions);

      // Future: Add Redis implementation
      // case 'redis':
      //   return new RedisCacheService(this.logger, mergedOptions);
    }
  }

  private getDefaultOptions(env: string): CacheOptions {
    switch (env) {
      case 'development':
        return {
          ttl: 5 * 60 * 1000, // 5 minutes
          maxSize: 1000,
          namespace: 'dev'
        };

      case 'test':
        return {
          ttl: 30 * 1000, // 30 seconds for tests
          maxSize: 100,
          namespace: 'test'
        };

      case 'production':
      case 'staging':
        return {
          ttl: 15 * 60 * 1000, // 15 minutes
          maxSize: 10000,
          namespace: 'prod'
        };

      default:
        return {
          ttl: 5 * 60 * 1000, // 5 minutes
          maxSize: 1000
        };
    }
  }
}

// Singleton cache service instance
export class CacheService {
  private static instance: ICacheService | null = null;
  private static factory: CacheFactory | null = null;

  static getInstance(logger?: LoggerService): ICacheService {
    if (!CacheService.instance) {
      if (!logger) {
        throw new Error('Logger service is required for cache service initialization');
      }

      CacheService.factory = new CacheFactory(logger);
      CacheService.instance = CacheService.factory.create();
    }

    return CacheService.instance;
  }

  static createInstance(logger: LoggerService, options?: CacheOptions): ICacheService {
    CacheService.factory = new CacheFactory(logger);
    CacheService.instance = CacheService.factory.create(options);
    return CacheService.instance;
  }

  static resetInstance(): void {
    if (CacheService.instance && typeof (CacheService.instance as any).destroy === 'function') {
      (CacheService.instance as any).destroy();
    }
    CacheService.instance = null;
    CacheService.factory = null;
  }

  static getStats() {
    return CacheService.instance?.getStats();
  }
}
