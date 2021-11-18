const { Client } = require('pg');
/**
 * Class wrapper for the PostgresDB client
 */
export class PostgresDB {
  static client : typeof Client = null;

  static async Connect() {
    this.client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'admin123',
      database : 'token_world'
    })


    await this.client.connect();
  }
  
}