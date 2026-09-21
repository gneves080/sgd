import { describe, expect, it } from 'vitest';
import {
  calculateEnvelopeUsage,
  calculateGoalProgress,
  calculateInstallmentImpact,
  calculateMonthlyBudget,
  calculateReserveMonthly,
} from './finance';

describe('finance calculations', () => {
  it('calculates monthly budget correctly', () => {
    expect(calculateMonthlyBudget([4000, 500], [2850, 200])).toBe(1450);
  });

  it('calculates installment impact correctly', () => {
    expect(calculateInstallmentImpact(1800, 12, 720)).toMatchObject({
      installmentValue: 150,
      remaining: 570,
      impact: 150,
    });
  });

  it('calculates goal progress without exceeding 100%', () => {
    expect(calculateGoalProgress(2350, 5000)).toBeCloseTo(47, 0);
    expect(calculateGoalProgress(6000, 5000)).toBe(100);
  });

  it('calculates reserve per month', () => {
    expect(calculateReserveMonthly(1800, 6)).toBe(300);
  });

  it('calculates envelope usage percentage', () => {
    expect(calculateEnvelopeUsage(468, 600)).toBeCloseTo(78, 0);
    expect(calculateEnvelopeUsage(700, 600)).toBe(100);
  });
});
