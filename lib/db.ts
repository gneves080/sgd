import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import type { AppData, Expense, FutureExpense, Goal, Income, Simulation, User, Envelope } from '@/database/schema';

const dataDir = path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'db.json');

const defaultData: AppData = {
  users: [
    {
      id: 'demo-user',
      name: 'Usuário Demo',
      email: 'demo@sgd.com',
      password: 'demo123',
      createdAt: new Date().toISOString(),
      role: 'user',
    },
  ],
  incomes: [
    { id: 'income-1', userId: 'demo-user', name: 'Salário', category: 'Principal', amount: 4000, date: '2026-09-01' },
    { id: 'income-2', userId: 'demo-user', name: 'Freelance', category: 'Extra', amount: 500, date: '2026-09-10' },
  ],
  expenses: [
    { id: 'expense-1', userId: 'demo-user', name: 'Aluguel', category: 'Moradia', amount: 1200, date: '2026-09-03', type: 'Fixa', recurrence: 'Mensal' },
    { id: 'expense-2', userId: 'demo-user', name: 'Mercado', category: 'Alimentação', amount: 680, date: '2026-09-11', type: 'Variável', recurrence: 'Mensal' },
    { id: 'expense-3', userId: 'demo-user', name: 'Internet', category: 'Contas', amount: 100, date: '2026-09-12', type: 'Recorrente', recurrence: 'Mensal' },
  ],
  envelopes: [
    { id: 'envelope-1', userId: 'demo-user', name: 'Moradia', planned: 1200, used: 1120 },
    { id: 'envelope-2', userId: 'demo-user', name: 'Mercado', planned: 600, used: 468 },
    { id: 'envelope-3', userId: 'demo-user', name: 'Transporte', planned: 400, used: 320 },
  ],
  goals: [
    { id: 'goal-1', userId: 'demo-user', name: 'Viagem', target: 5000, current: 2350, monthly: 700, dueDate: '2027-01-01' },
    { id: 'goal-2', userId: 'demo-user', name: 'Reserva de emergência', target: 12000, current: 8200, monthly: 450, dueDate: '2027-06-01' },
  ],
  futureExpenses: [
    { id: 'future-1', userId: 'demo-user', name: 'IPVA', value: 1800, months: 6 },
    { id: 'future-2', userId: 'demo-user', name: 'Seguro', value: 2400, months: 8 },
  ],
  simulations: [
    { id: 'sim-1', userId: 'demo-user', name: 'Cortar delivery', impact: 200, createdAt: new Date().toISOString() },
    { id: 'sim-2', userId: 'demo-user', name: 'Comprar celular', impact: -150, createdAt: new Date().toISOString() },
  ],
};

function ensureStore() {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  if (!existsSync(dataFile)) {
    writeFileSync(dataFile, JSON.stringify(defaultData, null, 2), 'utf8');
  }
}

export function readDb(): AppData {
  ensureStore();
  const file = readFileSync(dataFile, 'utf8');
  const parsed = JSON.parse(file) as AppData;
  return parsed;
}

export function writeDb(data: AppData) {
  ensureStore();
  writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
}

export function getUserByEmail(email: string) {
  const db = readDb();
  return db.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function createUser(input: { name: string; email: string; password: string }) {
  const db = readDb();
  const existing = getUserByEmail(input.email);
  if (existing) {
    return null;
  }

  const user: User = {
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    password: input.password,
    createdAt: new Date().toISOString(),
    role: 'user',
  };

  db.users.push(user);
  writeDb(db);
  return user;
}

export function getDashboardData(userId: string) {
  const db = readDb();
  const incomes = db.incomes.filter((item) => item.userId === userId);
  const expenses = db.expenses.filter((item) => item.userId === userId);
  const envelopes = db.envelopes.filter((item) => item.userId === userId);
  const goals = db.goals.filter((item) => item.userId === userId);
  const simulations = db.simulations.filter((item) => item.userId === userId);

  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const reserved = envelopes.reduce((sum, item) => sum + item.planned, 0) * 0.2;

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    reserved,
    available: totalIncome - totalExpense - reserved,
    incomes,
    expenses,
    envelopes,
    goals,
    simulations,
  };
}

export function createIncome(input: Omit<Income, 'id' | 'userId'> & { userId: string }) {
  const db = readDb();
  const item: Income = {
    ...input,
    id: crypto.randomUUID(),
    userId: input.userId,
  };
  db.incomes.push(item);
  writeDb(db);
  return item;
}

export function createExpense(input: Omit<Expense, 'id' | 'userId'> & { userId: string }) {
  const db = readDb();
  const item: Expense = {
    ...input,
    id: crypto.randomUUID(),
    userId: input.userId,
  };
  db.expenses.push(item);
  writeDb(db);
  return item;
}

export function createEnvelope(input: Omit<Envelope, 'id' | 'userId'> & { userId: string }) {
  const db = readDb();
  const item: Envelope = {
    ...input,
    id: crypto.randomUUID(),
    userId: input.userId,
  };
  db.envelopes.push(item);
  writeDb(db);
  return item;
}

export function createGoal(input: Omit<Goal, 'id' | 'userId'> & { userId: string }) {
  const db = readDb();
  const item: Goal = {
    ...input,
    id: crypto.randomUUID(),
    userId: input.userId,
  };
  db.goals.push(item);
  writeDb(db);
  return item;
}

export function createFutureExpense(input: Omit<FutureExpense, 'id' | 'userId'> & { userId: string }) {
  const db = readDb();
  const item: FutureExpense = {
    ...input,
    id: crypto.randomUUID(),
    userId: input.userId,
  };
  db.futureExpenses.push(item);
  writeDb(db);
  return item;
}

export function createSimulation(input: Omit<Simulation, 'id' | 'userId' | 'createdAt'> & { userId: string }) {
  const db = readDb();
  const item: Simulation = {
    ...input,
    id: crypto.randomUUID(),
    userId: input.userId,
    createdAt: new Date().toISOString(),
  };
  db.simulations.push(item);
  writeDb(db);
  return item;
}
