import { LoggerService } from '../service/logger.service';
import { CacheService } from '../service/cache.service';
import { createMemberCacheService, MemberCacheService } from '../service/member-cache.service';
import { Repository } from 'typeorm';
import { Member } from '../entity/MemberEntity';
import { MemberPicture } from '../entity/MemberPictureEntity';

// Mock the repository for testing
const mockMemberRepository = {
  findOneBy: jest.fn(),
  manager: {
    getRepository: jest.fn(() => mockPictureRepository)
  }
} as any;

const mockPictureRepository = {
  findOne: jest.fn()
} as any;

describe('Cache Service Integration', () => {
  let logger: LoggerService;
  let memberCacheService: MemberCacheService;

  beforeEach(() => {
    // Reset cache service between tests
    CacheService.resetInstance();

    logger = new LoggerService();
    memberCacheService = createMemberCacheService(logger, mockMemberRepository, mockPictureRepository);
  });

  afterEach(() => {
    CacheService.resetInstance();
  });

  describe('Logger Service', () => {
    it('should create logger instance', () => {
      expect(logger).toBeDefined();
      expect(typeof logger.info).toBe('function');
      expect(typeof logger.error).toBe('function');
    });

    it('should have log cache methods', () => {
      // Test that the logger has the specialized cache logging methods
      expect(typeof logger.logCacheHit).toBe('function');
      expect(typeof logger.logCacheMiss).toBe('function');
      expect(typeof logger.logDatabaseQuery).toBe('function');
      expect(typeof logger.logApiCall).toBe('function');
      expect(typeof logger.logPerformance).toBe('function');
    });
  });

  describe('Cache Service', () => {
    it('should create cache service instance', async () => {
      const cacheService = CacheService.getInstance(logger);
      expect(cacheService).toBeDefined();
      expect(typeof cacheService.get).toBe('function');
      expect(typeof cacheService.set).toBe('function');
    });

    it('should perform basic cache operations', async () => {
      const cacheService = CacheService.getInstance(logger);

      // Test set and get
      await cacheService.set('test-key', { data: 'test-value' });
      const result = await cacheService.get('test-key');

      expect(result).toBeDefined();
      expect(result?.data).toEqual({ data: 'test-value' });
    });

    it('should return cache statistics', async () => {
      const cacheService = CacheService.getInstance(logger);
      const stats = await cacheService.getStats();

      expect(stats).toBeDefined();
      expect(typeof stats.hits).toBe('number');
      expect(typeof stats.misses).toBe('number');
      expect(typeof stats.hitRate).toBe('number');
    });
  });

  describe('Member Cache Service', () => {
    it('should create member cache service', () => {
      expect(memberCacheService).toBeDefined();
      expect(typeof memberCacheService.getMemberData).toBe('function');
      expect(typeof memberCacheService.setMemberData).toBe('function');
    });

    it('should handle cache operations', async () => {
      // Mock the repository to return null (cache miss)
      mockMemberRepository.findOneBy.mockResolvedValue(null);

      // This would normally interact with the database, but we're just testing the interface
      const result = await memberCacheService.getMemberData('test-bioguide-id');

      // Should return null since we don't have real data
      expect(result).toBeNull();

      // Verify the mock was called
      expect(mockMemberRepository.findOneBy).toHaveBeenCalledWith({
        bioguideId: 'test-bioguide-id'
      });
    });
  });

  describe('Health Checks', () => {
    it('should perform cache health check', async () => {
      const cacheService = CacheService.getInstance(logger);
      const health = await cacheService.health();

      expect(health).toBeDefined();
      expect(['healthy', 'unhealthy']).toContain(health.status);
    });
  });
});
