import Database from 'better-sqlite3';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Creates a fresh in-memory SQLite database, applies the schema, and seeds it.
 *
 * In-memory keeps the suite deterministic, parallel-safe, and self-cleaning:
 * every run starts from an identical, known state and leaves nothing behind.
 *
 * The patterns here (connect from the framework, run verification queries,
 * assert on persisted state) transfer directly to Postgres, MySQL, MongoDB,
 * or DynamoDB; only the driver and dialect change, not the testing approach.
 */
export function createSeededDb(): Database.Database {
  const db = new Database(':memory:');
  db.pragma('foreign_keys = ON');
  const dir = __dirname;
  db.exec(readFileSync(join(dir, 'schema.sql'), 'utf8'));
  db.exec(readFileSync(join(dir, 'seed.sql'), 'utf8'));
  return db;
}