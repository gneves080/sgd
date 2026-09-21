import { SgdShell } from '@/components/sgd-shell';
import { installments } from '@/lib/sample-data';

export default function ParcelasPage() {
  return (
    <SgdShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Parcelas</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Controle de parcelas</h1>
        </div>
        <button className="btn-primary">Nova parcela</button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {installments.map((installment) => (
          <div key={installment.name} className="card p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">{installment.name}</h2>
              <span className="text-sm text-slate-400">{installment.remaining} restantes</span>
            </div>
            <p className="mt-4 text-sm text-slate-300">Total: R$ {installment.total.toLocaleString('pt-BR')}</p>
            <p className="mt-1 text-sm text-slate-300">Parcela: R$ {installment.installmentValue.toLocaleString('pt-BR')}</p>
            <p className="mt-1 text-sm text-slate-300">Pagas: {installment.paid} / {installment.totalInstallments}</p>
            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
              <p className="text-sm text-slate-400">Impacto mensal</p>
              <p className="mt-2 text-2xl font-semibold text-violet-400">R$ {installment.impact.toLocaleString('pt-BR')}</p>
            </div>
          </div>
        ))}
      </div>
    </SgdShell>
  );
}
