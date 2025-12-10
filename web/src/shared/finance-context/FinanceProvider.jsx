import { useState } from 'react';
import { FinanceContext } from './FinanceContext';
import { MOCK_DEBTS } from './mocks/debts';
import { MOCK_INCOMES } from './mocks/income';
import { MOCK_EXPENSES } from './mocks/expenses';

export const FinanceProvider = ({ children }) => {
  const [incomes, setIncomes] = useState(MOCK_INCOMES);
  const [expenses, setExpenses] = useState(MOCK_EXPENSES);
  const [debts, setDebts] = useState(MOCK_DEBTS);

  const value = {
    incomes,
    setIncomes,
    expenses,
    setExpenses,
    debts,
    setDebts,
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
};
