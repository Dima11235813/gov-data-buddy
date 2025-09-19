// Cache entry structure
export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl?: number;
  metadata?: {
    source?: string;
    version?: string;
    size?: number;
  };
}

// Cache statistics for monitoring
export interface CacheStats {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  evictions: number;
  hitRate: number;
  totalEntries: number;
  memoryUsage?: number;
}

// Cache configuration options
export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of entries
  namespace?: string; // Cache namespace for isolation
  compression?: boolean; // Enable compression for large data
  serialization?: 'json' | 'none'; // Data serialization method
  metadata?: {
    source?: string;
    size?: number;
  };
}

// Abstract cache service interface
export interface ICacheService {
  /**
   * Get a value from cache
   * @param key - Cache key
   * @returns Promise resolving to cached value or null if not found
   */
  get<T = any>(key: string): Promise<CacheEntry<T> | null>;

  /**
   * Set a value in cache
   * @param key - Cache key
   * @param value - Value to cache
   * @param options - Cache options (TTL, etc.)
   */
  set<T = any>(key: string, value: T, options?: CacheOptions): Promise<void>;

  /**
   * Delete a value from cache
   * @param key - Cache key
   * @returns Promise resolving to true if deleted, false if not found
   */
  delete(key: string): Promise<boolean>;

  /**
   * Check if a key exists in cache
   * @param key - Cache key
   * @returns Promise resolving to true if exists, false otherwise
   */
  has(key: string): Promise<boolean>;

  /**
   * Clear all values from cache
   */
  clear(): Promise<void>;

  /**
   * Get cache size
   * @returns Promise resolving to number of entries
   */
  size(): Promise<number>;

  /**
   * Get cache statistics
   * @returns Cache statistics
   */
  getStats(): Promise<CacheStats>;

  /**
   * Get all keys matching a pattern
   * @param pattern - Pattern to match keys against
   * @returns Promise resolving to array of matching keys
   */
  keys(pattern?: string): Promise<string[]>;

  /**
   * Get cache health status
   * @returns Promise resolving to health status
   */
  health(): Promise<{ status: 'healthy' | 'unhealthy'; latency?: number; error?: string }>;

  /**
   * Clean up expired entries (for implementations that don't auto-evict)
   */
  cleanup(): Promise<void>;
}

// Cache factory for creating cache instances
export interface ICacheFactory {
  create(options?: CacheOptions): ICacheService;
}

// Cache event types for monitoring
export enum CacheEventType {
  HIT = 'hit',
  MISS = 'miss',
  SET = 'set',
  DELETE = 'delete',
  EVICT = 'evict',
  CLEAR = 'clear',
  ERROR = 'error'
}

export interface CacheEvent {
  type: CacheEventType;
  key?: string;
  timestamp: number;
  metadata?: any;
}
