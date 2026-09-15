import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'cont_logistics_db',
  synchronize: true, // Tự động tạo/đồng bộ bảng trong DB
  logging: false,
  entities: ['src/models/*.ts'],
  subscribers: [],
  migrations: [],
});
