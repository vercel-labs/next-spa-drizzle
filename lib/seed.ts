import { sql } from '@vercel/postgres';
import { db } from '@/lib/drizzle';
import { users, User } from './drizzle';

export async function seed() {
  const createTable = await sql.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        image VARCHAR(255),
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
  `);
  console.log(`Created "users" table`);

  const insertedUsers: User[] = await db
    .insert(users)
    .values([
      {
        name: 'Nuno Maduro',
        email: 'nuno@gmail.com',
      },
      {
        name: 'Fernando Daciuk',
        email: 'fernando@gmail.com',
      },
    ])
    .returning();

  console.log(`Seeded ${insertedUsers.length} users`);

  return {
    createTable,
    insertedUsers,
  };
}
