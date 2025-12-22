import { useFinance } from '../shared/finance-context/FinanceContext'
import { Debt, DebtPayment } from '../shared/types'
import { useMemo } from 'react'

interface AddDebtParams {
  amount: string
  categoryId: string
  lender: string
  dueDate: string
}

export const useDebts = () => {
  const { debts, setDebts, setDebtPayments } = useFinance()

  const normalizedDebts = useMemo(
    () =>
      debts.map((debt) => ({
        ...debt,
        paid: debt.remainingAmount === 0,
        remainingAmount: debt.remainingAmount ?? debt.amount,
      })),
    [debts],
  )

  const addDebt = ({ amount, categoryId, lender, dueDate }: AddDebtParams) => {
    const now = new Date()

    const newDebt: Debt = {
      id: Date.now(),
      amount: parseFloat(amount),
      remainingAmount: parseFloat(amount),
      categoryId,
      lender,
      date: now.toISOString().split('T')[0],
      dueDate,
      paid: false,
    }

    setDebts((prev) => [...prev, newDebt])
  }

  const payDebt = (id: number, value: number) => {
    if (!Number.isFinite(value) || value <= 0) return

    const debtToUpdate = debts.find((d) => d.id === id)
    if (!debtToUpdate) return

    setDebts((prev) =>
      prev.map((debt) => {
        if (debt.id !== id) return debt

        const currentRemaining = debt.remainingAmount ?? debt.amount
        const payment = Math.min(value, currentRemaining)
        const updatedRemaining = parseFloat((currentRemaining - payment).toFixed(2))

        return {
          ...debt,
          remainingAmount: updatedRemaining,
          paid: updatedRemaining <= 0,
        }
      }),
    )

    // Add payment record
    const newPayment: DebtPayment = {
      id: Date.now(),
      debtId: id,
      amount: Math.min(value, debtToUpdate.remainingAmount ?? debtToUpdate.amount),
      lender: debtToUpdate.lender,
      date: new Date().toISOString(),
    }

    setDebtPayments((prev) => [...prev, newPayment])
  }

  const getMonthlyStats = () => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const monthlyDebts = normalizedDebts.filter((debt) => {
      const debtDate = new Date(debt.date)
      return debtDate.getMonth() === currentMonth && debtDate.getFullYear() === currentYear
    })

    const newDebts = monthlyDebts.filter((d) => !d.paid).length
    const paidDebts = monthlyDebts.filter((d) => d.paid).length
    const totalAmount = monthlyDebts.reduce((sum, d) => sum + d.amount, 0)

    return { newDebts, paidDebts, totalAmount }
  }

  const calculateFinancialHealth = () => {
    const totalDebt = normalizedDebts
      .filter((d) => !d.paid)
      .reduce((sum, d) => sum + (d.remainingAmount ?? d.amount), 0)

    if (totalDebt === 0) return 0
    if (totalDebt < 5000) return 1
    if (totalDebt < 15000) return 2
    return 3
  }

  return {
    debts: normalizedDebts,
    addDebt,
    payDebt,
    getMonthlyStats,
    calculateFinancialHealth,
  }
}
