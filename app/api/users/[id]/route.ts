import { db, users } from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { withMiddleware } from '../../middleware';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withMiddleware<{ id: string }>(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    let user = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(params.id)));

    if (user.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user[0]);
  }
);

export const PATCH = withMiddleware<{ id: string }>(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    let updateData = await request.json();
    let updatedUser = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, Number(params.id)))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser[0]);
  }
);

export const DELETE = withMiddleware<{ id: string }>(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    let deletedUser = await db
      .delete(users)
      .where(eq(users.id, Number(params.id)))
      .returning();

    if (deletedUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  }
);
