import { NextResponse } from 'next/server';

import { CRUDCRUD_BASE_URL, createCrudCrudItem, deleteCrudCrudItem, getCrudCrudCollection, updateCrudCrudItem } from '@/lib/crudcrud';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resource = searchParams.get('resource') ?? 'users';

  if (!CRUDCRUD_BASE_URL) {
    return NextResponse.json({ data: [], note: 'CRUDCrud não configurado' });
  }

  const data = await getCrudCrudCollection(resource);
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const resource = String(body.resource ?? 'users');
  const item = body.item ?? {};

  if (!CRUDCRUD_BASE_URL) {
    return NextResponse.json({ item }, { status: 201 });
  }

  const created = await createCrudCrudItem(resource, item);
  return NextResponse.json({ item: created }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const resource = String(body.resource ?? 'users');
  const id = String(body.id ?? '');
  const item = body.item ?? {};

  if (!CRUDCRUD_BASE_URL) {
    return NextResponse.json({ item }, { status: 200 });
  }

  const updated = await updateCrudCrudItem(resource, id, item);
  return NextResponse.json({ item: updated }, { status: 200 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const resource = searchParams.get('resource') ?? 'users';
  const id = searchParams.get('id') ?? '';

  if (!CRUDCRUD_BASE_URL) {
    return NextResponse.json({ ok: true });
  }

  const ok = await deleteCrudCrudItem(resource, id);
  return NextResponse.json({ ok });
}
