 'use client';

import { FormEvent, useEffect, useState } from 'react';
import { SgdShell } from '@/components/sgd-shell';
import type { Income } from '@/database/schema';

export default function ReceitasPage() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [name, setName] = useState('Salário');
  const [category, setCategory] = useState('Principal');
  const [amount, setAmount] = useState('4000');

  async function loadIncomes() {
    const response = await fetch('/api/incomes', { cache: 'no-store' });
    if (response.ok) setIncomes(await response.json());
  }

  useEffect(() => { loadIncomes(); }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/incomes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category, amount: Number(amount), date: new Date().toISOString() }),
    });
    if (response.ok) await loadIncomes();
  }

  return (
    <SgdShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Receitas</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Meu fluxo de entrada</h1>
        </div>
        <button className="btn-primary">Adicionar receita</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-xl font-semibold text-white">Receitas cadastradas</h2>
          <div className="mt-5 space-y-3">
            {incomes.map((income) => (
              <div key={income.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                <div>
                  <p className="font-medium text-white">{income.name}</p>
                  <p className="text-sm text-slate-400">{income.category}</p>
                </div>
                <strong className="text-emerald-400">R$ {income.amount.toLocaleString('pt-BR')}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-xl font-semibold text-white">Adicionar receita</h2>
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <input className="input" placeholder="Nome da receita" value={name} onChange={(event) => setName(event.target.value)} />
            <input className="input" placeholder="Categoria" value={category} onChange={(event) => setCategory(event.target.value)} />
            <input className="input" placeholder="Valor" type="number" min="0" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} />
            <button className="btn-primary w-full" type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </SgdShell>
  );
}
