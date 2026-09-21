'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({ error: 'Não foi possível criar a conta.' }));
      setError(data.error ?? 'Não foi possível criar a conta.');
      return;
    }

    router.push('/login');
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-300">SGD</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Criar conta</h1>
        <p className="mt-2 text-sm text-slate-400">Cadastre-se para começar a organizar seu orçamento.</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="register-name" className="mb-2 block text-sm text-slate-300">Nome</label>
            <input id="register-name" className="input" type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div>
            <label htmlFor="register-email" className="mb-2 block text-sm text-slate-300">E-mail</label>
            <input id="register-email" className="input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div>
            <label htmlFor="register-password" className="mb-2 block text-sm text-slate-300">Senha</label>
            <input id="register-password" className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <button type="submit" className="btn-primary w-full">Cadastrar</button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <Link href="/login" className="text-slate-400 hover:text-slate-200">Voltar ao login</Link>
          <Link href="/" className="text-blue-300 hover:text-blue-200">Página inicial</Link>
        </div>
      </div>
    </main>
  );
}