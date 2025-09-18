import 'reflect-metadata';
import { AppDataSource } from '../datasource/sqlite-datasource';

// Setup test database
beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
});

afterAll(async () => {
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }
});

// Clean up after each test
afterEach(async () => {
    if (AppDataSource.isInitialized) {
        // Disable foreign key checks for SQLite during cleanup
        await AppDataSource.query('PRAGMA foreign_keys = OFF');

        try {
            const entities = AppDataSource.entityMetadatas;
            // Clear tables in reverse order to handle dependencies
            for (let i = entities.length - 1; i >= 0; i--) {
                const entity = entities[i];
                const repository = AppDataSource.getRepository(entity.name);
                await repository.clear();
            }
        } finally {
            // Re-enable foreign key checks
            await AppDataSource.query('PRAGMA foreign_keys = ON');
        }
    }
});
