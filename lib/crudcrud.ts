export const CRUDCRUD_BASE_URL = process.env.CRUDCRUD_BASE_URL ?? '';

const baseUrl = (resource: string) => {
  if (!CRUDCRUD_BASE_URL) {
    return '';
  }

  const normalized = CRUDCRUD_BASE_URL.replace(/\/$/, '');
  return `${normalized}/${resource}`;
};

async function requestJson<T>(resource: string, options: RequestInit = {}): Promise<T[]> {
  if (!CRUDCRUD_BASE_URL) {
    return [] as T[];
  }

  const response = await fetch(baseUrl(resource), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return [] as T[];
  }

  const payload = await response.json();
  return Array.isArray(payload) ? (payload as T[]) : [];
}

export async function getCrudCrudCollection<T>(resource: string) {
  return requestJson<T>(resource);
}

export async function createCrudCrudItem<T>(resource: string, item: T) {
  if (!CRUDCRUD_BASE_URL) {
    return item;
  }

  const response = await fetch(baseUrl(resource), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar item em ${resource}`);
  }

  return response.json() as Promise<T>;
}

export async function updateCrudCrudItem<T>(resource: string, id: string, item: Partial<T>) {
  if (!CRUDCRUD_BASE_URL) {
    return item as T;
  }

  const response = await fetch(`${baseUrl(resource)}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Erro ao atualizar item em ${resource}`);
  }

  return response.json() as Promise<T>;
}

export async function deleteCrudCrudItem(resource: string, id: string) {
  if (!CRUDCRUD_BASE_URL) {
    return true;
  }

  const response = await fetch(`${baseUrl(resource)}/${id}`, {
    method: 'DELETE',
    cache: 'no-store',
  });

  return response.ok;
}

export const crudCrudResources = {
  users: 'users',
  incomes: 'incomes',
  expenses: 'expenses',
  envelopes: 'envelopes',
  goals: 'goals',
  futureExpenses: 'futureExpenses',
  simulations: 'simulations',
};
