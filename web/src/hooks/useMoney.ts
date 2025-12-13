import { useFinance } from '../shared/finance-context/FinanceContext'
import { Expense, Income } from '../shared/types'

interface AddIncomeParams {
  amount: string
  categoryId: string
  source: string
}

interface AddExpenseParams {
  amount: string
  categoryId: string
  description: string
}

export const useTransactions = () => {
  const { setIncomes, setExpenses } = useFinance()

  const addIncome = ({ amount, categoryId, source }: AddIncomeParams) => {
    const newIncome: Income = {
      id: Date.now(),
      amount: Number(amount),
      categoryId,
      date: new Date().toLocaleString(),
      source,
    }

    setIncomes((prev) => [...prev, newIncome])
  }

  const addExpense = ({ amount, categoryId, description }: AddExpenseParams) => {
    const newExpense: Expense = {
      id: Date.now(),
      amount: Number(amount),
      categoryId,
      date: new Date().toLocaleString(),
      description,
    }

    setExpenses((prev) => [...prev, newExpense])
  }

  return { addIncome, addExpense }
}
