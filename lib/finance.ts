export type CurrencyInput = number;

export const currency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);

export const calculateMonthlyBudget = (incomes: number[], expenses: number[]) => {
  const totalIncome = incomes.reduce((sum, value) => sum + value, 0);
  const totalExpense = expenses.reduce((sum, value) => sum + value, 0);
  return totalIncome - totalExpense;
};

export const calculateInstallmentImpact = (
  purchaseValue: number,
  installmentCount: number,
  monthlyAvailable: number,
) => {
  const installmentValue = purchaseValue / installmentCount;
  const remaining = monthlyAvailable - installmentValue;

  return {
    installmentValue,
    remaining,
    impact: installmentValue,
  };
};

export const calculateGoalProgress = (current: number, target: number) => {
  if (target <= 0) return 0;
  return Math.min((current / target) * 100, 100);
};

export const calculateReserveMonthly = (value: number, months: number) => {
  if (months <= 0) return 0;
  return value / months;
};

export const calculateEnvelopeUsage = (used: number, planned: number) => {
  if (planned <= 0) return 0;
  return Math.min((used / planned) * 100, 100);
};
