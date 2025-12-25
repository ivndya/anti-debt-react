import { useState } from 'react'
import { useNumberPad } from '../../../hooks/useNumberPad'
import { CategoryTabs } from '../../../widgets/category-tabs/CategoryTabs'
import { NumberPad } from '../../../widgets/number-pad/NumberPad'
import { EXPENSE_CATEGORIES } from '../../../shared/consts/categories/expenses'
import { useTransactions } from '../../../hooks/useMoney'
import { TransactionType } from '../../../shared/types'
import { INCOME_CATEGORIES } from '../../../shared/consts/categories/incomes'
import { Check, RussianRuble } from 'lucide-react'

export const TransactionNumberPad = () => {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [transactionType, setTransactionType] = useState<TransactionType>('expense')

  const toggleTransactionType = () => {
    setTransactionType((prev) => (prev === 'expense' ? 'income' : 'expense'))
  }

  const { amount, resetAmount, handleNumberPress, handleDeletePress } = useNumberPad()
  const { addIncome, addExpense } = useTransactions()

  const handleSubmit = () => {
    if (transactionType === 'expense') {
      const category = EXPENSE_CATEGORIES[selectedCategory]
      addExpense({
        amount,
        categoryId: category.id,
        description: category.name,
      })
    } else {
      const category = INCOME_CATEGORIES[selectedCategory]
      addIncome({ amount, categoryId: category.id, source: category.name })
    }
    resetAmount()
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex justify-center mb-4">
        <div
          className={`px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200
            bg-zinc-800`}
        >
          <span className="text-sm font-medium text-white">
            {transactionType === 'expense' ? 'Расход' : 'Доход'}
          </span>
        </div>
      </div>
      {/* Верхний блок: сумма */}
      <div className="flex justify-center items-center flex-1">
        <div
          onClick={toggleTransactionType}
          className={`text-6xl font-extrabold flex items-center gap-2
            ${transactionType === 'expense' ? 'text-red-500' : 'text-green-500'}`}
        >
          <span>{amount.includes('.') ? parseFloat(amount).toFixed(2) : amount}</span>
          <RussianRuble size={48} strokeWidth={3} />
        </div>
      </div>

      {/* Нижний блок: категории, NumberPad и кнопка */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="mb-6">
          <CategoryTabs
            categories={transactionType === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
        <div className="mb-4">
          <NumberPad onNumberPress={handleNumberPress} onDelete={handleDeletePress} />
        </div>
        <button
          onClick={handleSubmit}
          disabled={amount === '0' || amount === '0.'}
          className={`w-full p-4 rounded-lg border-none cursor-pointer transition-colors duration-200
            ${
              amount === '0' || amount === '0.'
                ? 'bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 cursor-not-allowed'
                : 'bg-green-600'
            }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            <span className="text-lg font-semibold text-white">Сохранить</span>
          </div>
        </button>
      </div>
    </div>
  )
}
