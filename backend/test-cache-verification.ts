import { AppDataSource } from './src/datasource/sqlite-datasource';
import { Member } from './src/entity/MemberEntity';
import { QueryEntity } from './src/entity/QueryEntity';

/**
 * Test script to verify caching system is working correctly
 */
async function verifyCachingSystem() {
    console.log('🔍 Verifying Caching System...\n');

    try {
        // Initialize database connection
        await AppDataSource.initialize();
        console.log('✅ Database connected\n');

        const memberRepository = AppDataSource.manager.getRepository(Member);
        const queryRepository = AppDataSource.manager.getRepository(QueryEntity);

        // 1. Check total counts
        const totalMembers = await memberRepository.count();
        const totalQueries = await queryRepository.count();

        console.log(`📊 Database Stats:`);
        console.log(`   Members: ${totalMembers}`);
        console.log(`   Queries: ${totalQueries}\n`);

        // 2. Check query distribution
        const queries = await queryRepository.find({
            order: { createdAt: 'DESC' },
            take: 10
        });

        console.log(`📋 Recent Queries:`);
        queries.forEach((query, index) => {
            console.log(`   ${index + 1}. ${query.endpoint} - ${query.originalQuery}`);
            console.log(`      ID: ${query.id}`);
            console.log(`      Params: ${query.normalizedParams}`);
            console.log(`      Results: ${query.resultCount}, Hits: ${query.hitCount}`);
            if (query.dateFrom && query.dateTo) {
                console.log(`      Date Range: ${query.dateFrom.toISOString().split('T')[0]} to ${query.dateTo.toISOString().split('T')[0]}`);
            }
            console.log('');
        });

        // 3. Check members with query relationships
        const membersWithQueries = await memberRepository.find({
            where: { queryId: null },
            take: 5
        });

        const membersWithoutQueries = await memberRepository.count({
            where: { queryId: null }
        });

        const membersWithQueriesCount = totalMembers - membersWithoutQueries;

        console.log(`🔗 Query Relationships:`);
        console.log(`   Members with query IDs: ${membersWithQueriesCount}`);
        console.log(`   Members without query IDs: ${membersWithoutQueries}`);
        console.log(`   Coverage: ${((membersWithQueriesCount / totalMembers) * 100).toFixed(1)}%\n`);

        if (membersWithoutQueries > 0) {
            console.log(`⚠️  Warning: ${membersWithoutQueries} members don't have query relationships`);
        }

        // 4. Check for duplicate queries
        const duplicateCheck = await queryRepository
            .createQueryBuilder('q')
            .select('q.endpoint, q.normalizedParams, COUNT(*) as count')
            .groupBy('q.endpoint, q.normalizedParams')
            .having('COUNT(*) > 1')
            .getRawMany();

        console.log(`🔍 Duplicate Query Check:`);
        if (duplicateCheck.length === 0) {
            console.log(`   ✅ No duplicate queries found`);
        } else {
            console.log(`   ❌ Found ${duplicateCheck.length} duplicate query patterns:`);
            duplicateCheck.forEach((dup, index) => {
                console.log(`      ${index + 1}. ${dup.q_endpoint} - ${dup.q_normalizedParams} (${dup.count} times)`);
            });
        }

        // 5. Test a specific query lookup
        if (queries.length > 0) {
            const testQuery = queries[0];
            console.log(`\n🧪 Testing Query Lookup:`);
            console.log(`   Looking for: ${testQuery.endpoint} - ${testQuery.normalizedParams}`);

            const foundQuery = await queryRepository.findOne({
                where: {
                    endpoint: testQuery.endpoint,
                    normalizedParams: testQuery.normalizedParams
                }
            });

            if (foundQuery) {
                console.log(`   ✅ Query found successfully (ID: ${foundQuery.id})`);

                // Check if members are linked
                const linkedMembers = await memberRepository.count({
                    where: { queryId: foundQuery.id }
                });
                console.log(`   📎 Linked members: ${linkedMembers}`);
            } else {
                console.log(`   ❌ Query not found!`);
            }
        }

        console.log(`\n🎉 Cache Verification Complete!`);

    } catch (error) {
        console.error('❌ Error during cache verification:', error);
    } finally {
        await AppDataSource.destroy();
    }
}

// Run the verification
verifyCachingSystem().catch(console.error);
