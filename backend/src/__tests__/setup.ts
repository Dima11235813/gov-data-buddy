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
        const entities = AppDataSource.entityMetadatas;
        for (const entity of entities) {
            const repository = AppDataSource.getRepository(entity.name);
            await repository.clear();
        }
    }
});
