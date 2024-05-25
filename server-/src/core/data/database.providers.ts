import { DataSource } from 'typeorm';
import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        port: 5432,
        host: '127.0.0.1',
        username: 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      });
      return dataSource.initialize();
    },
  },
];
