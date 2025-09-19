import { ICacheService, CacheEntry } from './cache.interface';
import { CacheService } from './cache.service';
import { LoggerService } from './logger.service';
import { Repository } from 'typeorm';
import { Member } from '../entity/MemberEntity';
import { MemberPicture } from '../entity/MemberPictureEntity';
import { getCurrentMemberPicture, getMemberPictureData } from '../api/member-picture.api';

// Member-specific cache service
export class MemberCacheService {
  private readonly CACHE_PREFIX = 'member:';
  private readonly PICTURE_CACHE_PREFIX = 'member_picture:';

  constructor(
    private cacheService: ICacheService,
    private logger: LoggerService,
    private memberRepository: Repository<Member>,
    private pictureRepository: Repository<MemberPicture>
  ) {}

  /**
   * Get cached member data with enhanced logging
   */
  async getMemberData(bioguideId: string): Promise<any | null> {
    const cacheKey = `${this.CACHE_PREFIX}${bioguideId}`;
    const startTime = Date.now();

    try {
      this.logger.debug(`Attempting to get member data from cache`, {
        operation: 'member-cache-get',
        bioguideId,
        cache: { key: cacheKey }
      });

      // Check runtime cache first
      const cachedEntry = await this.cacheService.get<any>(cacheKey);

      if (cachedEntry) {
        const age = Date.now() - cachedEntry.timestamp;
        const ttl = cachedEntry.ttl || (5 * 60 * 1000); // Default 5 minutes

        if (age < ttl) {
          this.logger.logCacheHit('member-cache-get', bioguideId, 'runtime', {
            operation: 'member-cache-get',
            cache: {
              hit: true,
              source: 'runtime',
              ttl,
              age,
              size: cachedEntry.metadata?.size
            },
            duration: Date.now() - startTime
          });

          return cachedEntry.data;
        } else {
          // Entry expired, remove it
          await this.cacheService.delete(cacheKey);
          this.logger.verbose(`Removed expired member cache entry: ${bioguideId}`, {
            operation: 'member-cache-expired',
            bioguideId,
            cache: { age, ttl }
          });
        }
      }

      // Cache miss - check database
      this.logger.logCacheMiss('member-cache-get', bioguideId, {
        operation: 'member-cache-get',
        cache: { hit: false, source: 'runtime' }
      });

      const dbStartTime = Date.now();
      let cachedMember: Member | null = null;

      try {
        cachedMember = await this.memberRepository.findOneBy({ bioguideId });

        this.logger.logDatabaseQuery(
          'member-cache-db-lookup',
          `SELECT * FROM member WHERE bioguideId = '${bioguideId}'`,
          Date.now() - dbStartTime,
          {
            operation: 'member-cache-db-lookup',
            bioguideId,
            database: { rowsAffected: cachedMember ? 1 : 0 }
          }
        );
      } catch (dbError) {
        this.logger.error('Database query failed for member lookup', {
          operation: 'member-cache-db-lookup',
          bioguideId,
          database: { query: `SELECT * FROM member WHERE bioguideId = '${bioguideId}'` }
        }, dbError as Error);
        return null;
      }

      if (!cachedMember) {
        this.logger.info(`Member not found in database: ${bioguideId}`, {
          operation: 'member-cache-db-miss',
          bioguideId
        });
        return null;
      }

      // Found in database, create response data
      this.logger.logCacheHit('member-cache-db-hit', bioguideId, 'database', {
        operation: 'member-cache-db-hit',
        bioguideId,
        cache: { hit: true, source: 'database' }
      });

      let responseData: any = { ...cachedMember };

      // Attach current picture data if available
      try {
        const pictureStartTime = Date.now();
        const currentPicture = await this.getCurrentMemberPicture(bioguideId);

        if (currentPicture) {
          const pictureData = getMemberPictureData(currentPicture);
          if (pictureData) {
            responseData.currentPicture = {
              id: currentPicture.id,
              base64Data: pictureData.base64Data,
              contentType: pictureData.contentType,
              version: currentPicture.version,
              isCurrentVersion: currentPicture.isCurrentVersion,
              attribution: currentPicture.attribution
            };

            this.logger.debug(`Attached picture data for member: ${bioguideId}`, {
              operation: 'member-cache-picture-attach',
              bioguideId,
              duration: Date.now() - pictureStartTime
            });
          }
        }
      } catch (pictureError) {
        this.logger.warn(`Failed to attach picture data for member: ${bioguideId}`, {
          operation: 'member-cache-picture-error',
          bioguideId
        }, pictureError as Error);
      }

      // Store in runtime cache
      await this.setMemberData(bioguideId, responseData);

      const totalDuration = Date.now() - startTime;
      this.logger.logPerformance('member-cache-get-total', totalDuration, {
        operation: 'member-cache-get-total',
        bioguideId,
        cache: { source: 'database', hit: true }
      });

      return responseData;

    } catch (error) {
      this.logger.error('Error in member cache get operation', {
        operation: 'member-cache-get-error',
        bioguideId,
        cache: { key: cacheKey }
      }, error as Error);
      return null;
    }
  }

  /**
   * Set member data in cache
   */
  async setMemberData(bioguideId: string, data: any): Promise<void> {
    const cacheKey = `${this.CACHE_PREFIX}${bioguideId}`;

    try {
      await this.cacheService.set(cacheKey, data, {
        ttl: 5 * 60 * 1000, // 5 minutes
        metadata: {
          source: 'member-service',
          size: this.calculateDataSize(data)
        }
      });

      this.logger.debug(`Stored member data in cache: ${bioguideId}`, {
        operation: 'member-cache-set',
        bioguideId,
        cache: { key: cacheKey, size: this.calculateDataSize(data) }
      });

    } catch (error) {
      this.logger.error('Error storing member data in cache', {
        operation: 'member-cache-set-error',
        bioguideId
      }, error as Error);
    }
  }

  /**
   * Invalidate member cache
   */
  async invalidateMember(bioguideId: string): Promise<void> {
    const cacheKey = `${this.CACHE_PREFIX}${bioguideId}`;

    try {
      const deleted = await this.cacheService.delete(cacheKey);

      if (deleted) {
        this.logger.info(`Invalidated member cache: ${bioguideId}`, {
          operation: 'member-cache-invalidate',
          bioguideId,
          cache: { key: cacheKey }
        });
      }

      // Also invalidate picture cache
      await this.invalidateMemberPicture(bioguideId);

    } catch (error) {
      this.logger.error('Error invalidating member cache', {
        operation: 'member-cache-invalidate-error',
        bioguideId
      }, error as Error);
    }
  }

  /**
   * Get current member picture from cache or database
   */
  private async getCurrentMemberPicture(bioguideId: string): Promise<MemberPicture | null> {
    const cacheKey = `${this.PICTURE_CACHE_PREFIX}${bioguideId}`;

    try {
      // Check cache first
      const cached = await this.cacheService.get<MemberPicture>(cacheKey);
      if (cached) {
        return cached.data;
      }

      // Get from database
      const picture = await getCurrentMemberPicture(bioguideId, this.pictureRepository);

      if (picture) {
        // Cache the result
        await this.cacheService.set(cacheKey, picture, {
          ttl: 10 * 60 * 1000 // 10 minutes for pictures
        });
      }

      return picture;

    } catch (error) {
      this.logger.warn(`Error getting current member picture: ${bioguideId}`, {
        operation: 'member-picture-cache-get-error',
        bioguideId
      }, error as Error);
      return null;
    }
  }

  /**
   * Invalidate member picture cache
   */
  private async invalidateMemberPicture(bioguideId: string): Promise<void> {
    const cacheKey = `${this.PICTURE_CACHE_PREFIX}${bioguideId}`;

    try {
      await this.cacheService.delete(cacheKey);
    } catch (error) {
      this.logger.warn(`Error invalidating member picture cache: ${bioguideId}`, {
        operation: 'member-picture-cache-invalidate-error',
        bioguideId
      }, error as Error);
    }
  }

  /**
   * Get cache statistics
   */
  async getCacheStats() {
    return await this.cacheService.getStats();
  }

  /**
   * Clear all member-related cache entries
   */
  async clearAll(): Promise<void> {
    try {
      const memberKeys = await this.cacheService.keys(`${this.CACHE_PREFIX}*`);
      const pictureKeys = await this.cacheService.keys(`${this.PICTURE_CACHE_PREFIX}*`);

      const allKeys = [...memberKeys, ...pictureKeys];

      for (const key of allKeys) {
        await this.cacheService.delete(key);
      }

      this.logger.info(`Cleared all member cache entries`, {
        operation: 'member-cache-clear-all',
        cache: { cleanedCount: allKeys.length }
      });

    } catch (error) {
      this.logger.error('Error clearing member cache', {
        operation: 'member-cache-clear-all'
      }, error as Error);
    }
  }

  /**
   * Warm up cache with popular members (for future implementation)
   */
  async warmupCache(popularMemberIds: string[]): Promise<void> {
    this.logger.info(`Starting member cache warmup with ${popularMemberIds.length} members`, {
      operation: 'member-cache-warmup-start',
      cache: { warmupCount: popularMemberIds.length }
    });

    // This would be implemented when we have usage analytics
    // For now, it's a placeholder for the roadmap
  }

  private calculateDataSize(data: any): number {
    try {
      return Buffer.byteLength(JSON.stringify(data), 'utf8');
    } catch {
      return 0;
    }
  }
}

// Factory function to create member cache service
export function createMemberCacheService(
  logger: LoggerService,
  memberRepository: Repository<Member>,
  pictureRepository: Repository<MemberPicture>
): MemberCacheService {
  const cacheService = CacheService.getInstance(logger);
  return new MemberCacheService(cacheService, logger, memberRepository, pictureRepository);
}
