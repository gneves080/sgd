import { NextResponse } from 'next/server';

import { loginUser } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? '').trim();
  const password = String(body.password ?? '').trim();

  const user = await loginUser(email, password);

  if (!user) {
    return NextResponse.json({ error: 'Credenciais inválidas. Use demo@sgd.com / demo123 ou um usuário cadastrado.' }, { status: 401 });
  }

  return NextResponse.json({ user });
}
