import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/lib/auth';
import { createEnvelope, createFutureExpense, createGoal, readDb } from '@/lib/db';
import { createUserItem, getUserItems } from '@/lib/user-data';

const resourceNames = ['envelopes', 'goals', 'futureExpenses'] as const;
type Resource = (typeof resourceNames)[number];

function isResource(value: string): value is Resource {
  return resourceNames.includes(value as Resource);
}

export async function GET(request: Request, context: { params: Promise<{ resource: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const { resource } = await context.params;
  if (!isResource(resource)) return NextResponse.json({ error: 'Recurso inválido' }, { status: 404 });

  const db = readDb();
  if (resource === 'envelopes') return NextResponse.json(await getUserItems('envelopes', user.id, db.envelopes));
  if (resource === 'goals') return NextResponse.json(await getUserItems('goals', user.id, db.goals));
  return NextResponse.json(await getUserItems('futureExpenses', user.id, db.futureExpenses));
}

export async function POST(request: Request, context: { params: Promise<{ resource: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const { resource } = await context.params;
  if (!isResource(resource)) return NextResponse.json({ error: 'Recurso inválido' }, { status: 404 });

  const body = await request.json();
  let localItem;

  if (resource === 'envelopes') {
    const input = { userId: user.id, name: String(body.name ?? ''), planned: Number(body.planned ?? 0), used: Number(body.used ?? 0) };
    localItem = await createUserItem('envelopes', { ...input, id: crypto.randomUUID() }, () => createEnvelope(input));
  } else if (resource === 'goals') {
    const input = { userId: user.id, name: String(body.name ?? ''), target: Number(body.target ?? 0), current: Number(body.current ?? 0), monthly: Number(body.monthly ?? 0), dueDate: String(body.dueDate ?? '') };
    localItem = await createUserItem('goals', { ...input, id: crypto.randomUUID() }, () => createGoal(input));
  } else {
    const input = { userId: user.id, name: String(body.name ?? ''), value: Number(body.value ?? 0), months: Number(body.months ?? 0) };
    localItem = await createUserItem('futureExpenses', { ...input, id: crypto.randomUUID() }, () => createFutureExpense(input));
  }

  return NextResponse.json(localItem, { status: 201 });
}