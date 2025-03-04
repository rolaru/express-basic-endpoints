import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from './../entities/user.entity';
import { Post } from './../entities/post.entity';
import { DbType } from './db.types';

dotenv.config();

/**
 * Server endpoints DataSource
 *
 * The API DataSource has different configuration compared to
 * the DataSource for the migrations. Here we need to specify
 * entities by importing them.
 */
const dataSource = new DataSource({
  type: process.env.DB_TYPE! as DbType,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Post],
  migrations: [],
});

dataSource
  .initialize()
  .catch((error) =>
    console.error(`Error initializing data source:\n${error.message}`)
  );

export default dataSource;
