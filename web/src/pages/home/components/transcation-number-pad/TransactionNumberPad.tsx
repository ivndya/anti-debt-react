import { useState } from 'react'
import { useNumberPad } from '../../../../hooks/useNumberPad'
import { CategoryTabs } from '../../../../widgets/category-tabs/CategoryTabs'
import { NumberPad } from '../../../../widgets/number-pad/NumberPad'
import { EXPENSE_CATEGORIES } from '../../../../shared/consts/categories/expenses'
import { useTransactions } from '../../../../hooks/useMoney'
import { TransactionType } from '../../../../shared/types'
import { INCOME_CATEGORIES } from '../../../../shared/consts/categories/incomes'
import { RussianRuble } from 'lucide-react'

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
    } else if (transactionType === 'income') {
      const category = INCOME_CATEGORIES[selectedCategory]
      addIncome({ amount, categoryId: category.id, source: category.name })
    }

    resetAmount()
  }

  return (
    <>
      <div className="p-6 mb-4 relative">
        <button
          onClick={toggleTransactionType}
          className={`px-4 py-2 rounded-lg absolute top-5 right-5
            ${transactionType === 'expense' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
        >
          {transactionType === 'expense' ? 'Расход' : 'Доход'}
        </button>
        <div className="text-5xl font-bold text-center mb-6 text-white flex items-center justify-center gap-2">
          <span>{amount.includes('.') ? parseFloat(amount).toFixed(2) : amount}</span>
          <RussianRuble size={40} color="white" />
        </div>

        <CategoryTabs
          categories={transactionType === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <NumberPad onNumberPress={handleNumberPress} onDelete={handleDeletePress} />

        <button
          onClick={handleSubmit}
          disabled={amount === '0' || amount === '0.'}
          className={`w-full p-4 rounded-lg mt-4 border-none cursor-pointer transition-colors duration-200 
    ${
      amount === '0' || amount === '0.'
        ? 'bg-[#3D3D3D] cursor-not-allowed'
        : 'bg-gray-600 hover:bg-green-500'
    }`}
        >
          <span className="text-center text-lg font-semibold text-white">Сохранить</span>
        </button>
      </div>
    </>
  )
}
