import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/lib/auth';
import { getDashboardData } from '@/lib/db';
import { getUserItems } from '@/lib/user-data';

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const localData = getDashboardData(user.id);
  const [incomes, expenses, envelopes, goals, simulations] = await Promise.all([
    getUserItems('incomes', user.id, localData.incomes),
    getUserItems('expenses', user.id, localData.expenses),
    getUserItems('envelopes', user.id, localData.envelopes),
    getUserItems('goals', user.id, localData.goals),
    getUserItems('simulations', user.id, localData.simulations),
  ]);
  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const reserved = envelopes.reduce((sum, item) => sum + item.planned, 0) * 0.2;
  const data = {
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
  return NextResponse.json(data);
}
