import { FinanceContext } from './FinanceContext';
import { MOCK_DEBTS } from './mocks/debts';
import { MOCK_INCOMES } from './mocks/income';
import { MOCK_EXPENSES } from './mocks/expenses';
import useLocalStorage from '../../hooks/useLocalStorage';

export const FinanceProvider = ({ children }) => {
  const [incomes, setIncomes] = useLocalStorage('incomes', MOCK_INCOMES);
  const [expenses, setExpenses] = useLocalStorage('expenses', MOCK_EXPENSES);
  const [debts, setDebts] = useLocalStorage('debts', MOCK_DEBTS);

  const value = {
    incomes,
    setIncomes,
    expenses,
    setExpenses,
    debts,
    setDebts,
  };

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
};
