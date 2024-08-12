import { db, users } from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { withMiddleware } from '../middleware';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withMiddleware(async () => {
  let allUsers = await db.select().from(users);
  return NextResponse.json(allUsers);
});

export const POST = withMiddleware(async (request: NextRequest) => {
  let userData = await request.json();
  let newUser = await db.insert(users).values(userData).returning();
  return NextResponse.json(newUser[0], { status: 201 });
});

export const PATCH = withMiddleware(async (request: NextRequest) => {
  let { id, ...updateData } = await request.json();
  let updatedUser = await db
    .update(users)
    .set(updateData)
    .where(eq(users.id, id))
    .returning();

  if (updatedUser.length === 0) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(updatedUser[0]);
});

export const DELETE = withMiddleware(async (request: NextRequest) => {
  let { id } = await request.json();
  let deletedUser = await db.delete(users).where(eq(users.id, id)).returning();

  if (deletedUser.length === 0) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'User deleted successfully' });
});
