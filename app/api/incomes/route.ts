import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/lib/auth';
import { createIncome, readDb } from '@/lib/db';
import { createUserItem, getUserItems } from '@/lib/user-data';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const db = readDb();
  const items = await getUserItems('incomes', user.id, db.incomes);
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const body = await request.json();
  const input = {
    userId: user.id,
    name: String(body.name ?? ''),
    category: String(body.category ?? ''),
    amount: Number(body.amount ?? 0),
    date: String(body.date ?? new Date().toISOString()),
  };
  const item = await createUserItem('incomes', { ...input, id: crypto.randomUUID() }, () => createIncome(input));

  return NextResponse.json(item, { status: 201 });
}
