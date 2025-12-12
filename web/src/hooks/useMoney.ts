import { useFinance } from '../shared/finance-context/FinanceContext'
import { Expense, Income } from '../shared/types'

interface AddIncomeParams {
  amount: number | string
  categoryId: string
  source: string
  comment?: string
  recurring?: boolean
}

interface AddExpenseParams {
  amount: number | string
  categoryId: string
  description?: string
}

export const useTransactions = () => {
  const { setIncomes, setExpenses } = useFinance()

  const addIncome = ({ amount, categoryId, source, comment, recurring }: AddIncomeParams): void => {
    const newIncome: Income = {
      id: Date.now(),
      amount: typeof amount === 'string' ? parseFloat(amount) : amount,
      categoryId,
      date: new Date().toLocaleString(),
      source,
      ...(comment && { comment }),
      ...(recurring !== undefined && { recurring }),
    }

    setIncomes((prev: Income[]) => [...prev, newIncome])
  }

  const addExpense = ({ amount, categoryId, description }: AddExpenseParams): void => {
    const newExpense: Expense = {
      id: Date.now(),
      amount: typeof amount === 'string' ? parseFloat(amount) : amount,
      categoryId,
      date: new Date().toLocaleString(),
      ...(description && { description }),
    }

    setExpenses((prev: Expense[]) => [...prev, newExpense])
  }

  return { addIncome, addExpense }
}