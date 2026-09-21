import Link from 'next/link';
import { ArrowRight, BarChart3, CircleDollarSign, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

const featureCards = [
  {
    title: 'Planejamento inteligente',
    description: 'Organize receitas, despesas, envelopes e metas em um painel único e claro.',
    icon: BarChart3,
  },
  {
    title: 'Simulador “E se...?”',
    description: 'Teste mudanças sem comprometer seu real. Veja o impacto antes de decidir.',
    icon: Sparkles,
  },
  {
    title: 'Controle de risco',
    description: 'Acompanhe reservas, parcelas e compromissos para reduzir surpresas no mês.',
    icon: ShieldCheck,
  },
];

const stats = [
  { label: 'Receitas', value: 'R$ 4.000', tone: 'text-emerald-400' },
  { label: 'Despesas', value: 'R$ 2.850', tone: 'text-rose-400' },
  { label: 'Disponível', value: 'R$ 650', tone: 'text-sky-400' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen text-slate-100">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">S</div>
          <div>
            <p className="text-lg font-semibold">SGD</p>
            <p className="text-xs text-slate-400">Simulador de Gastos Domésticos</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="#como-funciona">Como funciona</Link>
          <Link href="#simulador">Simulador</Link>
          <Link href="#metas">Metas</Link>
          <Link href="#faq">FAQ</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-ghost">Entrar</Link>
          <Link href="/dashboard" className="btn-primary">Começar agora</Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-200">
            <TrendingUp className="h-4 w-4" />
            Planeje hoje. Simule amanhã.
          </div>
          <h1 className="max-w-xl text-4xl font-bold tracking-tight text-white md:text-6xl">
            Simule suas decisões. Organize seu dinheiro.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Planeje seus gastos, acompanhe suas metas e descubra o impacto de uma decisão financeira antes de colocá-la em prática.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/dashboard" className="btn-primary gap-2">
              Começar agora <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#simulador" className="btn-secondary">Conhecer o simulador</Link>
          </div>

          <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="card p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                <p className={`mt-3 text-2xl font-semibold ${item.tone}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card overflow-hidden p-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Resumo do mês</p>
              <span className="badge border-emerald-500/40 bg-emerald-500/10 text-emerald-300">Seguro</span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-slate-900 p-3">
                <span className="text-slate-400">Receitas</span>
                <strong className="text-emerald-400">R$ 4.000</strong>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-900 p-3">
                <span className="text-slate-400">Despesas</span>
                <strong className="text-rose-400">R$ 2.850</strong>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-900 p-3">
                <span className="text-slate-400">Saldo previsto</span>
                <strong className="text-blue-400">R$ 1.150</strong>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-300">Orçamento utilizado</span>
                <span className="text-slate-400">71%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[71%] rounded-full bg-gradient-to-r from-emerald-400 to-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Como funciona</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Tomar decisões financeiras com clareza</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featureCards.map(({ title, description, icon: Icon }) => (
            <div key={title} className="card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="simulador" className="mx-auto max-w-7xl px-6 py-16">
        <div className="card p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-300">E se...?</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Simule cenários sem mexer no real</h2>
            </div>
            <div className="badge border-violet-500/40 bg-violet-500/10 text-violet-200">
              <CircleDollarSign className="h-4 w-4" />
              Cenários isolados
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {[
              'Aumentar renda +R$ 500',
              'Cortar delivery -R$ 200',
              'Comprar celular R$ 1.800',
            ].map((scenario) => (
              <div key={scenario} className="rounded-2xl border border-slate-700 bg-slate-950 p-5">
                <p className="text-sm text-slate-400">Cenário</p>
                <p className="mt-3 text-lg font-medium text-white">{scenario}</p>
                <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  Impacto mensal: +R$ 200
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="metas" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: 'Viagem', progress: 47, value: 'R$ 2.350 / R$ 5.000' },
            { name: 'Reserva de emergência', progress: 68, value: 'R$ 8.200 / R$ 12.000' },
            { name: 'Celular', progress: 22, value: 'R$ 890 / R$ 4.000' },
          ].map((goal) => (
            <div key={goal.name} className="card p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{goal.name}</h3>
                <span className="text-sm text-slate-400">{goal.progress}%</span>
              </div>
              <p className="mt-4 text-sm text-slate-300">{goal.value}</p>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${goal.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold text-white">Perguntas frequentes</h2>
        <div className="mt-8 grid gap-4">
          {[
            'O SGD altera meus dados reais durante a simulação?',
            'Posso criar cenários diferentes ao mesmo tempo?',
            'O sistema funciona em celular e desktop?',
          ].map((question) => (
            <div key={question} className="card p-5 text-slate-300">
              {question}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
