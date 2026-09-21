'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, CreditCard, PiggyBank, Receipt, Wallet } from 'lucide-react';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const chartData = [
  { name: 'Jan', receitas: 3000, despesas: 2200 },
  { name: 'Fev', receitas: 3600, despesas: 2500 },
  { name: 'Mar', receitas: 4000, despesas: 2850 },
  { name: 'Abr', receitas: 3900, despesas: 2700 },
  { name: 'Mai', receitas: 4300, despesas: 2900 },
];

const quickActions = [
  { title: 'Receitas', value: 'R$ 4.000', icon: Wallet },
  { title: 'Despesas', value: 'R$ 2.850', icon: Receipt },
  { title: 'Metas', value: 'R$ 5.000', icon: PiggyBank },
  { title: 'Parcelas', value: 'R$ 1.080', icon: CreditCard },
];

export default function DashboardPage() {
  const [overview, setOverview] = useState([
    { label: 'Receitas', value: 'R$ 0', tone: 'text-emerald-400' },
    { label: 'Despesas', value: 'R$ 0', tone: 'text-rose-400' },
    { label: 'Saldo previsto', value: 'R$ 0', tone: 'text-blue-400' },
    { label: 'Disponível', value: 'R$ 0', tone: 'text-violet-400' },
  ]);

  useEffect(() => {
    async function load() {
      const response = await fetch('/api/dashboard');
      if (!response.ok) return;
      const data = await response.json();
      setOverview([
        { label: 'Receitas', value: `R$ ${Number(data.totalIncome ?? 0).toLocaleString('pt-BR')}`, tone: 'text-emerald-400' },
        { label: 'Despesas', value: `R$ ${Number(data.totalExpense ?? 0).toLocaleString('pt-BR')}`, tone: 'text-rose-400' },
        { label: 'Saldo previsto', value: `R$ ${Number(data.balance ?? 0).toLocaleString('pt-BR')}`, tone: 'text-blue-400' },
        { label: 'Disponível', value: `R$ ${Number(data.available ?? 0).toLocaleString('pt-BR')}`, tone: 'text-violet-400' },
      ]);
    }

    load();
  }, []);

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Resumo do mês</h1>
          </div>
          <button className="btn-primary gap-2">
            <ArrowUpRight className="h-4 w-4" />
            Novo cenário
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overview.map((item) => (
            <div key={item.label} className="stat-card">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className={`mt-4 text-3xl font-semibold ${item.tone}`}>{item.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Evolução financeira</h2>
              <span className="badge border-emerald-500/40 bg-emerald-500/10 text-emerald-300">Seguro</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12 }} />
                  <Bar dataKey="receitas" fill="#60a5fa" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="despesas" fill="#f87171" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-xl font-semibold text-white">Orçamento</h2>
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-slate-300">Utilizado</span>
                <span className="text-sm text-slate-400">71% do orçamento</span>
              </div>
              <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[71%] rounded-full bg-gradient-to-r from-emerald-400 to-blue-500" />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {quickActions.map(({ title, value, icon: Icon }) => (
                <div key={title} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-slate-300">{title}</span>
                  </div>
                  <strong className="text-white">{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
