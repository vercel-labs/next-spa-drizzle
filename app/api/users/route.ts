import { db, users } from '@/lib/drizzle';

export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    return Response.json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
