import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { DbType } from './db.types';

dotenv.config();

/**
 * Migrations DataSource
 *
 * The migrations DataSource has different configuration compared
 * to the DataSource for the API endpoints. Here we need to specify
 * entities using a path string.
 */
export default new DataSource({
  type: process.env.DB_TYPE! as DbType,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['entities/**/*.entity.ts'],
  migrations: ['db/migrations/**/*.ts'],
});
