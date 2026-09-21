import { NextResponse } from 'next/server';

import { createUser } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const password = String(body.password ?? '').trim();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Preencha todos os campos' }, { status: 400 });
  }

  const user = createUser({ name, email, password });

  if (!user) {
    return NextResponse.json({ error: 'Usuário já existe' }, { status: 409 });
  }

  if (process.env.CRUDCRUD_BASE_URL) {
    await fetch(`${process.env.CRUDCRUD_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        role: user.role,
      }),
    }).catch(() => undefined);
  }

  return NextResponse.json({ user }, { status: 201 });
}
