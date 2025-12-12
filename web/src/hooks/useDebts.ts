import { useFinance } from '../shared/finance-context/FinanceContext'
import { Debt, StatsData } from '../shared/types'

interface AddDebtParams {
  amount: string | number
  categoryId: string
  lender: string
}

export const useDebts = () => {
  const { debts, setDebts } = useFinance()

  const addDebt = ({ amount, categoryId, lender }: AddDebtParams): void => {
    const newDebt: Debt = {
      id: Date.now(),
      amount: typeof amount === 'string' ? parseInt(amount, 10) : amount,
      categoryId,
      lender,
      date: new Date().toLocaleString(),
      paid: false,
    }

    setDebts((prev: Debt[]) => [...prev, newDebt])
  }

  const deleteDebt = (id: number): void => {
    const updatedDebts = debts.filter((d: Debt) => d.id !== id)
    setDebts(updatedDebts)
  }

  const getMonthlyStats = (): StatsData => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const monthlyDebts = debts.filter((debt: Debt) => {
      const debtDate = new Date(debt.date)
      return debtDate.getMonth() === currentMonth && debtDate.getFullYear() === currentYear
    })

    const newDebts = monthlyDebts.filter((d: Debt) => !d.paid).length
    const paidDebts = monthlyDebts.filter((d: Debt) => d.paid).length
    const totalAmount = monthlyDebts.reduce((sum: number, d: Debt) => sum + d.amount, 0)

    return { newDebts, paidDebts, totalAmount }
  }

  const calculateFinancialHealth = (): number => {
    const totalDebt = debts
      .filter((d: Debt) => !d.paid)
      .reduce((sum: number, d: Debt) => sum + d.amount, 0)

    if (totalDebt === 0) return 0
    if (totalDebt < 5000) return 1
    if (totalDebt < 15000) return 2
    return 3
  }

  return {
    debts,
    addDebt,
    deleteDebt,
    getMonthlyStats,
    calculateFinancialHealth,
  }
}