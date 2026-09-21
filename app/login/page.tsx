'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('demo@sgd.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setError('Credenciais inválidas. Use demo@sgd.com / demo123');
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-300">SGD</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Entrar</h1>
        <p className="mt-2 text-sm text-slate-400">Acesse sua conta e continue planejando seu mês.</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-email" className="mb-2 block text-sm text-slate-300">E-mail</label>
            <input id="login-email" className="input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div>
            <label htmlFor="login-password" className="mb-2 block text-sm text-slate-300">Senha</label>
            <input id="login-password" className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <button type="submit" className="btn-primary w-full">Entrar</button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm">
          <Link href="/" className="text-slate-400 hover:text-slate-200">Voltar</Link>
          <Link href="/register" className="text-blue-300 hover:text-blue-200">Criar conta</Link>
        </div>
      </div>
    </main>
  );
}
