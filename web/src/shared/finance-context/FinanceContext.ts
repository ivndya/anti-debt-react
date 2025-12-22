import { createContext, useContext } from 'react'
import { Debt, Expense, Income, DebtPayment } from '../types'

export interface FinanceContextValue {
  incomes: Income[]
  setIncomes: React.Dispatch<React.SetStateAction<Income[]>>
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
  debts: Debt[]
  setDebts: React.Dispatch<React.SetStateAction<Debt[]>>
  debtPayments: DebtPayment[]
  setDebtPayments: React.Dispatch<React.SetStateAction<DebtPayment[]>>
  balance: number
}

export const FinanceContext = createContext<FinanceContextValue | null>(null)

export const useFinance = (): FinanceContextValue => {
  const ctx = useContext(FinanceContext)

  if (!ctx) {
    throw new Error('useFinance must be used inside <FinanceProvider>')
  }

  return ctx
}
