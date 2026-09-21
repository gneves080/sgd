import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/lib/auth';
import { createSimulation, readDb } from '@/lib/db';
import { createUserItem, getUserItems } from '@/lib/user-data';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const db = readDb();
  const items = await getUserItems('simulations', user.id, db.simulations);
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const body = await request.json();
  const input = {
    userId: user.id,
    name: String(body.name ?? 'Cenário'),
    impact: Number(body.impact ?? 0),
  };
  const item = await createUserItem(
    'simulations',
    { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
    () => createSimulation(input),
  );

  return NextResponse.json(item, { status: 201 });
}
