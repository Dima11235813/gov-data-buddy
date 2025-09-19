import { ICacheService, CacheEntry, CacheOptions, CacheStats, CacheEvent, CacheEventType } from './cache.interface';
import { LoggerService } from './logger.service';

// In-memory cache implementation using Map
export class MemoryCacheService implements ICacheService {
  private cache = new Map<string, CacheEntry>();
  private stats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    evictions: 0
  };
  private defaultTtl: number;
  private maxSize?: number;
  private cleanupInterval?: NodeJS.Timeout;

  constructor(
    private logger: LoggerService,
    options: CacheOptions = {}
  ) {
    this.defaultTtl = options.ttl || 5 * 60 * 1000; // 5 minutes default
    this.maxSize = options.maxSize;

    // Start cleanup interval for expired entries
    this.startCleanupInterval();
  }

  async get<T = any>(key: string): Promise<CacheEntry<T> | null> {
    const startTime = Date.now();

    try {
      const entry = this.cache.get(key);

      if (!entry) {
        this.stats.misses++;
        this.logger.logCacheMiss('memory-cache-get', key, {
          operation: 'memory-cache-get',
          cache: { hit: false }
        });
        return null;
      }

      // Check if entry has expired
      const now = Date.now();
      const ttl = entry.ttl || this.defaultTtl;

      if (now - entry.timestamp > ttl) {
        this.cache.delete(key);
        this.stats.misses++;
        this.stats.evictions++;
        this.logger.logCacheMiss('memory-cache-get-expired', key, {
          operation: 'memory-cache-get-expired',
          cache: { hit: false, ttl }
        });
        return null;
      }

      this.stats.hits++;
      this.logger.logCacheHit('memory-cache-get', key, 'runtime', {
        operation: 'memory-cache-get',
        cache: { hit: true, source: 'runtime', ttl },
        duration: Date.now() - startTime
      });

      return entry as CacheEntry<T>;
    } catch (error) {
      this.logger.error('Error getting from memory cache', {
        operation: 'memory-cache-get',
        cache: { hit: false }
      }, error as Error);
      return null;
    }
  }

  async set<T = any>(key: string, value: T, options?: CacheOptions): Promise<void> {
    const startTime = Date.now();

    try {
      // Check max size before adding
      if (this.maxSize && this.cache.size >= this.maxSize) {
        // Simple LRU: remove oldest entry
        const firstKey = this.cache.keys().next().value;
        if (firstKey) {
          this.cache.delete(firstKey);
          this.stats.evictions++;
          this.logger.verbose(`Evicted oldest entry from memory cache: ${firstKey}`);
        }
      }

      const entry: CacheEntry<T> = {
        data: value,
        timestamp: Date.now(),
        ttl: options?.ttl || this.defaultTtl,
        metadata: {
          source: 'memory',
          size: this.calculateSize(value)
        }
      };

      this.cache.set(key, entry);
      this.stats.sets++;

      this.logger.debug(`Set memory cache entry: ${key}`, {
        operation: 'memory-cache-set',
        cache: { size: this.cache.size, ttl: entry.ttl },
        duration: Date.now() - startTime
      });

    } catch (error) {
      this.logger.error('Error setting memory cache entry', {
        operation: 'memory-cache-set',
        cache: { hit: false }
      }, error as Error);
      throw error;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      const deleted = this.cache.delete(key);
      if (deleted) {
        this.stats.deletes++;
        this.logger.debug(`Deleted memory cache entry: ${key}`, {
          operation: 'memory-cache-delete'
        });
      }
      return deleted;
    } catch (error) {
      this.logger.error('Error deleting from memory cache', {
        operation: 'memory-cache-delete'
      }, error as Error);
      return false;
    }
  }

  async has(key: string): Promise<boolean> {
    try {
      const entry = this.cache.get(key);
      if (!entry) return false;

      // Check if expired
      const now = Date.now();
      const ttl = entry.ttl || this.defaultTtl;

      if (now - entry.timestamp > ttl) {
        this.cache.delete(key);
        this.stats.evictions++;
        return false;
      }

      return true;
    } catch (error) {
      this.logger.error('Error checking memory cache key existence', {
        operation: 'memory-cache-has'
      }, error as Error);
      return false;
    }
  }

  async clear(): Promise<void> {
    try {
      const previousSize = this.cache.size;
      this.cache.clear();
      this.logger.info(`Cleared memory cache (${previousSize} entries)`, {
        operation: 'memory-cache-clear',
        cache: { previousSize }
      });
    } catch (error) {
      this.logger.error('Error clearing memory cache', {
        operation: 'memory-cache-clear'
      }, error as Error);
      throw error;
    }
  }

  async size(): Promise<number> {
    return this.cache.size;
  }

  async getStats(): Promise<CacheStats> {
    const totalRequests = this.stats.hits + this.stats.misses;
    const hitRate = totalRequests > 0 ? this.stats.hits / totalRequests : 0;

    return {
      ...this.stats,
      hitRate,
      totalEntries: this.cache.size,
      memoryUsage: this.calculateTotalSize()
    };
  }

  async keys(pattern?: string): Promise<string[]> {
    try {
      const allKeys = Array.from(this.cache.keys());

      if (!pattern) {
        return allKeys;
      }

      // Simple pattern matching (could be enhanced with regex)
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      return allKeys.filter(key => regex.test(key));
    } catch (error) {
      this.logger.error('Error getting memory cache keys', {
        operation: 'memory-cache-keys'
      }, error as Error);
      return [];
    }
  }

  async health(): Promise<{ status: 'healthy' | 'unhealthy'; latency?: number; error?: string }> {
    const startTime = Date.now();

    try {
      // Simple health check - try to perform basic operations
      const testKey = '__health_check__';
      await this.set(testKey, 'test');
      await this.get(testKey);
      await this.delete(testKey);

      return {
        status: 'healthy',
        latency: Date.now() - startTime
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        latency: Date.now() - startTime,
        error: (error as Error).message
      };
    }
  }

  async cleanup(): Promise<void> {
    const startTime = Date.now();
    let cleanedCount = 0;

    try {
      const now = Date.now();
      const keysToDelete: string[] = [];

      for (const [key, entry] of this.cache.entries()) {
        const ttl = entry.ttl || this.defaultTtl;
        if (now - entry.timestamp > ttl) {
          keysToDelete.push(key);
        }
      }

      keysToDelete.forEach(key => {
        this.cache.delete(key);
        cleanedCount++;
      });

      if (cleanedCount > 0) {
        this.stats.evictions += cleanedCount;
        this.logger.info(`Cleaned up ${cleanedCount} expired entries from memory cache`, {
          operation: 'memory-cache-cleanup',
          cache: { cleanedCount },
          duration: Date.now() - startTime
        });
      }

    } catch (error) {
      this.logger.error('Error during memory cache cleanup', {
        operation: 'memory-cache-cleanup'
      }, error as Error);
    }
  }

  // Private methods
  private startCleanupInterval(): void {
    // Run cleanup every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  private calculateSize(value: any): number {
    try {
      // Rough estimation of memory usage
      const str = JSON.stringify(value);
      return Buffer.byteLength(str, 'utf8');
    } catch {
      return 0;
    }
  }

  private calculateTotalSize(): number {
    let total = 0;
    for (const entry of this.cache.values()) {
      total += this.calculateSize(entry.data);
      total += this.calculateSize(entry.metadata);
    }
    return total;
  }

  // Cleanup on destruction
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.cache.clear();
  }
}
