 'use client';

import { useEffect, useState } from 'react';
import { SgdShell } from '@/components/sgd-shell';
import type { Goal } from '@/database/schema';
import { calculateGoalProgress } from '@/lib/finance';

export default function MetasPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  useEffect(() => { fetch('/api/finance/goals', { cache: 'no-store' }).then((response) => response.ok && response.json()).then((data) => data && setGoals(data)); }, []);

  return (
    <SgdShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Metas</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Minhas metas</h1>
        </div>
        <button className="btn-primary">Nova meta</button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {goals.map((goal) => {
          const progress = calculateGoalProgress(goal.current, goal.target);
          return (
            <div key={goal.name} className="card p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">{goal.name}</h2>
                <span className="text-sm text-slate-400">{Math.round(progress)}%</span>
              </div>
              <p className="mt-4 text-sm text-slate-300">Objetivo: R$ {goal.target.toLocaleString('pt-BR')}</p>
              <p className="mt-1 text-sm text-slate-300">Atual: R$ {goal.current.toLocaleString('pt-BR')}</p>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-4 text-sm text-slate-400">Planejado por mês: R$ {goal.monthly.toLocaleString('pt-BR')}</p>
            </div>
          );
        })}
      </div>
    </SgdShell>
  );
}
