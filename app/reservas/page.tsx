 'use client';

import { useEffect, useState } from 'react';
import { SgdShell } from '@/components/sgd-shell';
import type { FutureExpense } from '@/database/schema';
import { calculateReserveMonthly } from '@/lib/finance';

export default function ReservasPage() {
  const [futureExpenses, setFutureExpenses] = useState<FutureExpense[]>([]);
  useEffect(() => { fetch('/api/finance/futureExpenses', { cache: 'no-store' }).then((response) => response.ok && response.json()).then((data) => data && setFutureExpenses(data)); }, []);

  return (
    <SgdShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Reservas</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Fundos para despesas futuras</h1>
        </div>
        <button className="btn-primary">Nova reserva</button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {futureExpenses.map((expense) => {
          const monthly = calculateReserveMonthly(expense.value, expense.months);
          return (
            <div key={expense.name} className="card p-5">
              <h2 className="text-xl font-semibold text-white">{expense.name}</h2>
              <p className="mt-4 text-sm text-slate-300">Valor: R$ {expense.value.toLocaleString('pt-BR')}</p>
              <p className="mt-1 text-sm text-slate-300">Prazo: {expense.months} meses</p>
              <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-sm text-slate-400">Necessário guardar</p>
                <p className="mt-2 text-2xl font-semibold text-emerald-400">R$ {monthly.toLocaleString('pt-BR')}/mês</p>
              </div>
            </div>
          );
        })}
      </div>
    </SgdShell>
  );
}
