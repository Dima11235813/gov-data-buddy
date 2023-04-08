import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const initDb = async () => {
    const db = await open({ filename: './database.sqlite', driver: sqlite3.Database });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS bills (
      id INTEGER PRIMARY KEY,
      searchQuery TEXT,
      data TEXT
    )
  `);

    return db;
};

export default initDb;