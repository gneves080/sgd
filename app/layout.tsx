import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SGD | Simulador de Gastos Domésticos',
  description: 'Planeje hoje. Simule amanhã. Controle seu dinheiro.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans">{children}</body>
    </html>
  );
}
