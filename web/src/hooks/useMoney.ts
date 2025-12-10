import { useFinance } from '../shared/finance-context/FinanceContext';
import { Expense, Income } from '../shared/types';

export const useTransactions = () => {
  const { setIncomes, setExpenses } = useFinance();

  const addIncome = ({ amount, categoryId, source }) => {
    const newIncome: Income = {
      id: Date.now(),
      amount,
      categoryId,
      date: new Date().toLocaleString(),
      source,
    };

    setIncomes((prev) => [...prev, newIncome]);
  };

  const addExpense = ({ amount, categoryId, description }) => {
    const newExpense: Expense = {
      id: Date.now(),
      amount,
      categoryId,
      date: new Date().toLocaleString(),
      description,
    };

    setExpenses((prev) => [...prev, newExpense]);
  };

  return { addIncome, addExpense };
};
