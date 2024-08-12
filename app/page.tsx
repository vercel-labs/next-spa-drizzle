'use client';

import { users } from '@/lib/drizzle';
import { useState, useEffect } from 'react';

type User = typeof users.$inferSelect;

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }

      setLoading(false);
    }

    fetchUsers();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {loading && <p>Loading users...</p>}
      {!loading && users.length === 0 && <p>No users found.</p>}
      {!loading && users.length > 0 && (
        <ul className="ml-3 space-y-2 list-disc">
          {users.map((user: User) => (
            <li key={user.id} className="text-sm">
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
