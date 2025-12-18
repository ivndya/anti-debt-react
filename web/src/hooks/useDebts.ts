import { useFinance } from '../shared/finance-context/FinanceContext'
import { Debt } from '../shared/types'

interface AddDebtParams {
  amount: string
  categoryId: string
  lender: string
  dueDate: string
}

export const useDebts = () => {
  const { debts, setDebts } = useFinance()

  const addDebt = ({ amount, categoryId, lender, dueDate }: AddDebtParams) => {
    const now = new Date()

    const newDebt: Debt = {
      id: Date.now(),
      amount: parseInt(amount, 10),
      categoryId,
      lender,
      date: now.toISOString(),
      dueDate,
      paid: false,
    }

    setDebts((prev) => [...prev, newDebt])
  }

  const deleteDebt = (id: number) => {
    const updatedDebts = debts.filter((d) => d.id !== id)

    setDebts(updatedDebts)
  }

  const getMonthlyStats = () => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const monthlyDebts = debts.filter((debt) => {
      const debtDate = new Date(debt.date)
      return debtDate.getMonth() === currentMonth && debtDate.getFullYear() === currentYear
    })

    const newDebts = monthlyDebts.filter((d) => !d.paid).length
    const paidDebts = monthlyDebts.filter((d) => d.paid).length
    const totalAmount = monthlyDebts.reduce((sum, d) => sum + d.amount, 0)

    return { newDebts, paidDebts, totalAmount }
  }

  const calculateFinancialHealth = () => {
    const totalDebt = debts.filter((d) => !d.paid).reduce((sum, d) => sum + d.amount, 0)

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
