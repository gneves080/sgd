export type IncomeItem = {
  name: string;
  category: string;
  amount: number;
};

export type ExpenseItem = {
  name: string;
  category: string;
  amount: number;
  type: 'Fixa' | 'Variável' | 'Recorrente' | 'Parcelada';
  recurrence: 'Mensal' | 'Semanal' | 'Anual';
};

export const incomes: IncomeItem[] = [
  { name: 'Salário', category: 'Principal', amount: 4000 },
  { name: 'Freelance', category: 'Extra', amount: 500 },
];

export const expenses: ExpenseItem[] = [
  { name: 'Aluguel', category: 'Moradia', amount: 1200, type: 'Fixa', recurrence: 'Mensal' },
  { name: 'Mercado', category: 'Alimentação', amount: 680, type: 'Variável', recurrence: 'Mensal' },
  { name: 'Transporte', category: 'Transporte', amount: 420, type: 'Fixa', recurrence: 'Mensal' },
  { name: 'Internet', category: 'Contas', amount: 100, type: 'Recorrente', recurrence: 'Mensal' },
  { name: 'Assinaturas', category: 'Assinaturas', amount: 180, type: 'Recorrente', recurrence: 'Mensal' },
  { name: 'Notebook', category: 'Compras', amount: 3600, type: 'Parcelada', recurrence: 'Mensal' },
];

export const envelopes = [
  { name: 'Moradia', planned: 1200, used: 1120 },
  { name: 'Mercado', planned: 600, used: 468 },
  { name: 'Transporte', planned: 400, used: 320 },
  { name: 'Lazer', planned: 300, used: 210 },
  { name: 'Cartão', planned: 500, used: 440 },
  { name: 'Reserva', planned: 500, used: 120 },
];

export const goals = [
  { name: 'Viagem', target: 5000, current: 2350, monthly: 700 },
  { name: 'Reserva de emergência', target: 12000, current: 8200, monthly: 450 },
  { name: 'Celular', target: 4000, current: 890, monthly: 250 },
];

export const futureExpenses = [
  { name: 'IPVA', value: 1800, months: 6 },
  { name: 'Seguro', value: 2400, months: 8 },
];

export const scenarios = [
  { name: 'Comprar celular', impact: -150 },
  { name: 'Cortar delivery', impact: 200 },
  { name: 'Trocar de emprego', impact: 700 },
];

export const installments = [
  { name: 'Notebook', total: 3600, installmentValue: 300, totalInstallments: 12, paid: 6, remaining: 6, dueDate: '15/10', impact: 300 },
  { name: 'Celular', total: 1800, installmentValue: 150, totalInstallments: 12, paid: 3, remaining: 9, dueDate: '22/10', impact: 150 },
];

export const recurring = [
  { name: 'Netflix', value: 39.9 },
  { name: 'Spotify', value: 21.9 },
  { name: 'Internet', value: 100 },
  { name: 'Academia', value: 80 },
];

export const challengeList = [
  { name: 'Desafio 30 dias', goal: 300, progress: 220, deadline: '30 dias', achievement: 'Economizar 73%' },
  { name: 'Desafio sem delivery', goal: 150, progress: 90, deadline: '15 dias', achievement: 'Economizar 60%' },
  { name: 'Desafio diário', goal: 300, progress: 180, deadline: '30 dias', achievement: 'Guardar 60%' },
];

export const financialEvents = [
  { date: '21', title: 'Salário', type: 'income', amount: 3500 },
  { date: '24', title: 'Internet', type: 'expense', amount: 100 },
  { date: '26', title: 'Mercado', type: 'expense', amount: 450 },
  { date: '29', title: 'Energia', type: 'expense', amount: 180 },
];

export const monthlyComparison = [
  { month: 'Jan', total: 2400 },
  { month: 'Fev', total: 2650 },
  { month: 'Mar', total: 2750 },
  { month: 'Abr', total: 2500 },
  { month: 'Mai', total: 2850 },
];

export const insightList = [
  'Seus gastos com alimentação aumentaram 18% em relação ao mês anterior.',
  'Você possui R$ 450 em despesas parceladas futuras.',
  'Suas assinaturas representam R$ 180 por mês.',
  'Você aumentou sua reserva em R$ 300 este mês.',
];
