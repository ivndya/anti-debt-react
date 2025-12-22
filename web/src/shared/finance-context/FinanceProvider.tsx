import { useMemo } from 'react'
import { FinanceContext } from './FinanceContext'
import { MOCK_DEBTS } from './mocks/debts'
import { MOCK_INCOMES } from './mocks/income'
import { MOCK_EXPENSES } from './mocks/expenses'
import useLocalStorage from '../../hooks/useLocalStorage'
import { Debt, Expense, FinanceProviderProps, Income } from '../types'

export const FinanceProvider: React.FC<FinanceProviderProps> = ({ children }) => {
  const [incomes, setIncomesRaw] = useLocalStorage('incomes', MOCK_INCOMES)
  const [expenses, setExpensesRaw] = useLocalStorage('expenses', MOCK_EXPENSES)
  const [debts, setDebtsRaw] = useLocalStorage('debts', MOCK_DEBTS)

  const balance = useMemo(() => {
    const incomesSum = incomes.reduce((sum, income) => sum + Number(income.amount || 0), 0)
    const expensesSum = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0)

    // считаем выплаченное по долгам, чтобы учитывать реальные траты
    const debtsPaid = debts.reduce((sum, debt) => {
      const remaining = debt.remainingAmount ?? debt.amount
      const paidAmount = Math.max(0, debt.amount - remaining)
      return sum + paidAmount
    }, 0)

    return incomesSum - expensesSum - debtsPaid
  }, [incomes, expenses, debts])

  const setIncomes: React.Dispatch<React.SetStateAction<Income[]>> = (value) =>
    typeof value === 'function' ? setIncomesRaw(value(incomes)) : setIncomesRaw(value)

  const setExpenses: React.Dispatch<React.SetStateAction<Expense[]>> = (value) =>
    typeof value === 'function' ? setExpensesRaw(value(expenses)) : setExpensesRaw(value)

  const setDebts: React.Dispatch<React.SetStateAction<Debt[]>> = (value) =>
    typeof value === 'function' ? setDebtsRaw(value(debts)) : setDebtsRaw(value)

  const value = {
    incomes,
    setIncomes,
    expenses,
    setExpenses,
    debts,
    setDebts,
    balance,
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}
