import Link from 'next/link';
import { ArrowLeftRight, Banknote, CalendarRange, CreditCard, LayoutGrid, PiggyBank, ReceiptText, Settings, ShieldCheck, WalletCards } from 'lucide-react';

const mainNav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/receitas', label: 'Receitas', icon: WalletCards },
  { href: '/despesas', label: 'Despesas', icon: ReceiptText },
  { href: '/envelopes', label: 'Envelopes', icon: PiggyBank },
  { href: '/simulador', label: 'Simulador', icon: ArrowLeftRight },
  { href: '/metas', label: 'Metas', icon: Banknote },
  { href: '/reservas', label: 'Reservas', icon: ShieldCheck },
  { href: '/calendario', label: 'Calendário', icon: CalendarRange },
  { href: '/parcelas', label: 'Parcelas', icon: CreditCard },
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
];

export function SgdShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="hidden min-h-screen w-72 border-r border-slate-800 bg-slate-900/80 p-5 lg:block">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold">S</div>
            <div>
              <p className="text-xl font-semibold">SGD</p>
              <p className="text-xs text-slate-400">Simulador de Gastos</p>
            </div>
          </div>

          <nav className="space-y-2">
            {mainNav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
            <div className="flex items-center justify-between px-5 py-4 md:px-8">
              <div className="lg:hidden">
                <Link href="/dashboard" className="text-lg font-semibold">SGD</Link>
              </div>
              <div className="hidden items-center gap-3 md:flex">
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">Planeje hoje. Simule amanhã.</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="btn-secondary">Perfil</button>
                <Link href="/" className="btn-primary">Sair</Link>
              </div>
            </div>
          </header>
          <main className="p-6 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
