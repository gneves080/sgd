 'use client';

import { FormEvent, useEffect, useState } from 'react';
import { SgdShell } from '@/components/sgd-shell';
import type { Expense } from '@/database/schema';

export default function DespesasPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState('Mercado');
  const [category, setCategory] = useState('Alimentação');
  const [amount, setAmount] = useState('680');
  const [type, setType] = useState<Expense['type']>('Variável');

  async function loadExpenses() {
    const response = await fetch('/api/expenses', { cache: 'no-store' });
    if (response.ok) setExpenses(await response.json());
  }

  useEffect(() => { loadExpenses(); }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category, amount: Number(amount), type, recurrence: 'Mensal', date: new Date().toISOString() }),
    });
    if (response.ok) await loadExpenses();
  }

  return (
    <SgdShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Despesas</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Controle de gastos</h1>
        </div>
        <button className="btn-primary">Nova despesa</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-xl font-semibold text-white">Despesas por categoria</h2>
          <div className="mt-5 space-y-3">
            {expenses.map((expense) => (
              <div key={expense.id} className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{expense.name}</p>
                    <p className="text-sm text-slate-400">{expense.category} · {expense.type}</p>
                  </div>
                  <strong className="text-rose-400">R$ {expense.amount.toLocaleString('pt-BR')}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-xl font-semibold text-white">Registrar despesa</h2>
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <input className="input" placeholder="Nome da despesa" value={name} onChange={(event) => setName(event.target.value)} />
            <input className="input" placeholder="Categoria" value={category} onChange={(event) => setCategory(event.target.value)} />
            <input className="input" placeholder="Valor" type="number" min="0" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} />
            <select className="input" value={type} onChange={(event) => setType(event.target.value as Expense['type'])}>
              <option>Fixa</option>
              <option>Variável</option>
              <option>Recorrente</option>
              <option>Parcelada</option>
            </select>
            <button className="btn-primary w-full" type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </SgdShell>
  );
}
