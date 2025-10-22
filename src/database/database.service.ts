import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool!: mysql.Pool;

  async onModuleInit() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || 'mysql-19a63462-gbox-3aed.d.aivencloud.com',
      port: Number(process.env.DB_PORT) || 21025,
      user: process.env.DB_USER || 'avnadmin',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'defaultdb',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    try {
      const conn = await this.pool.getConnection();
      await conn.ping();
      conn.release();
      console.log('MySQL pool connected successfully');
    } catch (error) {
      console.error('MySQL connection failed:', error);
      throw error;
    }
  }

  getPool(): mysql.Pool {
    if (!this.pool) {
      throw new Error('MySQL pool not initialized yet');
    }
    return this.pool;
  }

  async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const [rows] = await this.pool.query(sql, params);
    return rows as T[];
  }

  async execute<T = any>(sql: string, params?: any[]): Promise<T> {
    const [result] = await this.pool.execute(sql, params);
    return result as T;
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('MySQL pool closed');
  }
}