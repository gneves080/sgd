import { cookies } from 'next/headers';

import { getUserByEmail } from '@/lib/db';

export type SessionUser = {
  id: string;
  email: string;
  name: string;
};

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get('sgd-session')?.value;

  if (!session) return null;

  try {
    const user = JSON.parse(session) as SessionUser;
    return user;
  } catch {
    return null;
  }
}

async function getRemoteUser(email: string, password: string) {
  const baseUrl = process.env.CRUDCRUD_BASE_URL;
  if (!baseUrl) return null;

  try {
    const response = await fetch(`${baseUrl}/users`, { cache: 'no-store' });
    if (!response.ok) return null;

    const users = (await response.json()) as Array<{ id?: string; email?: string; password?: string; name?: string }>;
    const match = users.find(
      (user) => String(user.email ?? '').toLowerCase() === email.toLowerCase() && String(user.password ?? '') === password,
    );

    return match ? { id: String(match.id ?? ''), email: String(match.email ?? ''), name: String(match.name ?? '') } : null;
  } catch {
    return null;
  }
}

export async function loginUser(email: string, password: string) {
  const localUser = getUserByEmail(email);
  const user = localUser && localUser.password === password ? localUser : await getRemoteUser(email, password);

  if (!user) {
    return null;
  }

  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  const cookieStore = await cookies();
  cookieStore.set('sgd-session', JSON.stringify(payload), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return payload;
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('sgd-session');
}

export async function getUserByEmailDirect(email: string) {
  return getUserByEmail(email);
}
