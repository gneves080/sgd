export type UserRole = 'user';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  role: UserRole;
};

export type Income = {
  id: string;
  userId: string;
  name: string;
  category: string;
  amount: number;
  date: string;
};

export type Expense = {
  id: string;
  userId: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: 'Fixa' | 'Variável' | 'Recorrente' | 'Parcelada';
  recurrence: 'Mensal' | 'Semanal' | 'Anual';
};

export type Envelope = {
  id: string;
  userId: string;
  name: string;
  planned: number;
  used: number;
};

export type Goal = {
  id: string;
  userId: string;
  name: string;
  target: number;
  current: number;
  monthly: number;
  dueDate: string;
};

export type FutureExpense = {
  id: string;
  userId: string;
  name: string;
  value: number;
  months: number;
};

export type Simulation = {
  id: string;
  userId: string;
  name: string;
  impact: number;
  createdAt: string;
};

export type AppData = {
  users: User[];
  incomes: Income[];
  expenses: Expense[];
  envelopes: Envelope[];
  goals: Goal[];
  futureExpenses: FutureExpense[];
  simulations: Simulation[];
};
