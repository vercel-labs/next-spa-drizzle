import { db, users } from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { withMiddleware } from '../middleware';
import { NextRequest } from 'next/server';

export const GET = withMiddleware(async () => {
  let allUsers = await db.select().from(users);
  return Response.json(allUsers);
});

export const POST = withMiddleware(async (request: NextRequest) => {
  let userData = await request.json();
  let newUser = await db.insert(users).values(userData).returning();
  return Response.json(newUser[0], { status: 201 });
});

export const PATCH = withMiddleware(async (request: NextRequest) => {
  let { id, ...updateData } = await request.json();
  let updatedUser = await db
    .update(users)
    .set(updateData)
    .where(eq(users.id, id))
    .returning();

  if (updatedUser.length === 0) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  return Response.json(updatedUser[0]);
});

export const DELETE = withMiddleware(async (request: NextRequest) => {
  let { id } = await request.json();
  let deletedUser = await db.delete(users).where(eq(users.id, id)).returning();

  if (deletedUser.length === 0) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  return Response.json({ message: 'User deleted successfully' });
});
