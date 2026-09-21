 'use client';

import { FormEvent, useEffect, useState } from 'react';
import { SgdShell } from '@/components/sgd-shell';
import type { Simulation } from '@/database/schema';

export default function SimuladorPage() {
  const [scenarios, setScenarios] = useState<Simulation[]>([]);
  const [name, setName] = useState('Cortar delivery');
  const [impact, setImpact] = useState('200');

  async function loadScenarios() {
    const response = await fetch('/api/simulations', { cache: 'no-store' });
    if (response.ok) setScenarios(await response.json());
  }

  useEffect(() => { loadScenarios(); }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/simulations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, impact: Number(impact) }),
    });
    if (response.ok) await loadScenarios();
  }

  return (
    <SgdShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-300">E se...?</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Cenários simulados</h1>
        </div>
        <button className="btn-primary">Novo cenário</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="card p-5">
            <p className="text-sm text-slate-400">Cenário</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{scenario.name}</h2>
            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-sm text-slate-400">Impacto mensal</p>
              <p className={`mt-2 text-2xl font-semibold ${scenario.impact >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {scenario.impact >= 0 ? '+' : '-'}R$ {Math.abs(scenario.impact).toLocaleString('pt-BR')}
              </p>
            </div>
            <button className="btn-secondary mt-5 w-full" type="button">Comparar cenário</button>
          </div>
        ))}
        <div className="card p-5">
          <h2 className="text-xl font-semibold text-white">Novo cenário</h2>
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <input className="input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nome do cenário" />
            <input className="input" type="number" step="0.01" value={impact} onChange={(event) => setImpact(event.target.value)} placeholder="Impacto mensal" />
            <button className="btn-primary w-full" type="submit">Salvar cenário</button>
          </form>
        </div>
      </div>
    </SgdShell>
  );
}
