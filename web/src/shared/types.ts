import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

export interface Debt {
  id: number
  amount: number
  remainingAmount: number
  categoryId: string
  lender: string
  date: string
  paid: boolean
  dueDate: string
}

export interface DebtsListProps {
  debts: Debt[]
  onSelectDebt: (debt: Debt) => void
}

export interface DebtModalProps {
  open: boolean
  lenderName: string
  onchangeLenderName: (value: string) => void
  dueDate: string
  onChangeDueDate: (value: string) => void
  onCancel: () => void
  onConfirm: () => void
}

export interface ChangeDebtModalProps {
  open: boolean
  debt: Debt | null
  payAmount: string
  onChangePayAmount: (value: string) => void
  onCancel: () => void
  onPay: () => void
}

export interface StatsData {
  newDebts: number
  paidDebts: number
  totalAmount: number
}

export interface StatsProps {
  healthIndex?: number
  healthLabel?: string
  stats: StatsData
}

export interface FinanceProviderProps {
  children: ReactNode
}

export interface BottomNavProps {
  activeScreen: string
  onChange: (screenId: string) => void
}

export interface CategoryTabsProps {
  categories: Category[]
  selectedCategory: number
  onSelectCategory: (index: number) => void
}

export interface NumberPadProps {
  onNumberPress: (value: string) => void
  onDelete: () => void
}

export interface Expense {
  id: number
  amount: number
  categoryId: string
  description?: string
  date: string
}

export interface Income {
  id: number
  amount: number
  categoryId: string
  source: string
  date: string
  comment?: string
  recurring?: boolean
}

export interface DebtPayment {
  id: number
  debtId: number
  amount: number
  lender: string
  date: string
}

export interface Category {
  id: string
  name: string
  color: string
  icon: LucideIcon
}

export interface CategoryMap {
  [key: string]: Category
}

export type TransactionType = 'expense' | 'income'
