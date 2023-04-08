import { DataSource } from "typeorm";
import { Bill } from "../entities/Bill";
import { LatestAction } from "../entities/LatestAction";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    logging: false,
    entities: [Bill, LatestAction],
  });