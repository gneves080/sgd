import { SgdShell } from '@/components/sgd-shell';
import { financialEvents } from '@/lib/sample-data';

export default function CalendarioPage() {
  return (
    <SgdShell>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Calendário</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Eventos financeiros do mês</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-xl font-semibold text-white">Agenda</h2>
          <div className="mt-5 space-y-3">
            {financialEvents.map((event) => (
              <div key={`${event.date}-${event.title}`} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                    {event.date}
                  </div>
                  <div>
                    <p className="font-medium text-white">{event.title}</p>
                    <p className="text-sm text-slate-400">{event.type === 'income' ? 'Entrada' : 'Saída'}</p>
                  </div>
                </div>
                <strong className={event.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}>
                  {event.type === 'income' ? '+' : '-'}R$ {event.amount.toLocaleString('pt-BR')}
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-xl font-semibold text-white">Resumo do mês</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-sm text-slate-400">Saldo atual</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-400">R$ 3.500</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-sm text-slate-400">Saldo projetado</p>
              <p className="mt-2 text-2xl font-semibold text-blue-400">R$ 2.770</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-sm text-slate-400">Menor saldo previsto</p>
              <p className="mt-2 text-2xl font-semibold text-amber-400">R$ 2.770</p>
            </div>
          </div>
        </div>
      </div>
    </SgdShell>
  );
}
