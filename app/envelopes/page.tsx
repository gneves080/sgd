 'use client';

import { useEffect, useState } from 'react';
import { SgdShell } from '@/components/sgd-shell';
import type { Envelope } from '@/database/schema';

export default function EnvelopesPage() {
  const [envelopes, setEnvelopes] = useState<Envelope[]>([]);
  useEffect(() => { fetch('/api/finance/envelopes', { cache: 'no-store' }).then((response) => response.ok && response.json()).then((data) => data && setEnvelopes(data)); }, []);

  return (
    <SgdShell>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Envelopes</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Orçamento por envelopes</h1>
        </div>
        <button className="btn-primary">Novo envelope</button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {envelopes.map((envelope) => {
          const percentage = Math.min((envelope.used / envelope.planned) * 100, 100);
          const tone = percentage >= 90 ? 'bg-rose-500' : percentage >= 75 ? 'bg-amber-500' : 'bg-emerald-500';
          const remaining = envelope.planned - envelope.used;

          return (
            <div key={envelope.name} className="card p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">{envelope.name}</h2>
                <span className="text-sm text-slate-400">{Math.round(percentage)}%</span>
              </div>
              <p className="mt-4 text-sm text-slate-300">R$ {envelope.used.toLocaleString('pt-BR')} / R$ {envelope.planned.toLocaleString('pt-BR')}</p>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-800">
                <div className={`h-full rounded-full ${tone}`} style={{ width: `${percentage}%` }} />
              </div>
              <p className="mt-4 text-sm text-slate-400">Restante: R$ {remaining.toLocaleString('pt-BR')}</p>
            </div>
          );
        })}
      </div>
    </SgdShell>
  );
}
