import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    };
  }
);

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

// Connect to Vercel Postgres
export const db = drizzle(sql);
