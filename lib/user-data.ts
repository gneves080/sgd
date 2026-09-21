import type { AppData, Envelope, Expense, FutureExpense, Goal, Income, Simulation } from '@/database/schema';
import { createCrudCrudItem, crudCrudResources, getCrudCrudCollection } from '@/lib/crudcrud';

type Resource = keyof typeof crudCrudResources;
type DataItem = Income | Expense | Envelope | Goal | FutureExpense | Simulation;

function hasRemoteData() {
  return Boolean(process.env.CRUDCRUD_BASE_URL);
}

function normalizeItem<T extends DataItem>(item: T & { _id?: string }) {
  return { ...item, id: item.id || item._id || crypto.randomUUID() } as T;
}

export async function getRemoteUserItems<T extends DataItem>(resource: Resource, userId: string) {
  if (!hasRemoteData()) return null;

  try {
    const items = await getCrudCrudCollection<T & { _id?: string }>(crudCrudResources[resource]);
    return items.filter((item) => item.userId === userId).map(normalizeItem);
  } catch {
    return null;
  }
}

export async function getUserItems<T extends DataItem>(
  resource: Resource,
  userId: string,
  localItems: T[],
) {
  const remoteItems = await getRemoteUserItems<T>(resource, userId);
  return remoteItems ?? localItems.filter((item) => item.userId === userId);
}

export async function createUserItem<T extends DataItem>(
  resource: Resource,
  item: T,
  localFallback: () => T,
) {
  if (hasRemoteData()) {
    try {
      const created = await createCrudCrudItem(crudCrudResources[resource], item);
      return normalizeItem(created as T & { _id?: string });
    } catch {
      return localFallback();
    }
  }

  return localFallback();
}

export type LocalCollections = Pick<AppData, 'incomes' | 'expenses' | 'envelopes' | 'goals' | 'futureExpenses' | 'simulations'>;