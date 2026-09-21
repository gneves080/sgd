import { SgdShell } from '@/components/sgd-shell';

export default function ConfiguracoesPage() {
  return (
    <SgdShell>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Configurações</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Perfil e preferências</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-xl font-semibold text-white">Dados pessoais</h2>
          <form className="mt-5 space-y-4">
            <input className="input" defaultValue="Maria Silva" />
            <input className="input" defaultValue="maria@sgd.com" />
            <input className="input" defaultValue="Renda familiar: R$ 6.500" />
            <button className="btn-primary w-full" type="button">Salvar alterações</button>
          </form>
        </div>

        <div className="card p-5">
          <h2 className="text-xl font-semibold text-white">Preferências</h2>
          <div className="mt-5 space-y-3 text-slate-300">
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <span>Modo escuro</span>
              <span className="badge border-emerald-500/40 bg-emerald-500/10 text-emerald-300">Ativo</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <span>Notificações</span>
              <span className="badge border-blue-500/40 bg-blue-500/10 text-blue-300">Habilitadas</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <span>Exportação de relatórios</span>
              <span className="badge border-violet-500/40 bg-violet-500/10 text-violet-300">PDF / CSV</span>
            </div>
          </div>
        </div>
      </div>
    </SgdShell>
  );
}
