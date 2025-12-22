import { useState } from 'react'
import { useNumberPad } from '../../../../hooks/useNumberPad'
import { DEBT_CATEGORIES } from '../../../../shared/consts/categories/debts'
import { CategoryTabs } from '../../../../widgets/category-tabs/CategoryTabs'
import { NumberPad } from '../../../../widgets/number-pad/NumberPad'
import { DebtModal } from '../debt-modal/DebtModal'
import { Check, RussianRuble } from 'lucide-react'

interface DebtsNumberPadProps {
  addDebt: ({
    amount,
    categoryId,
    lender,
    dueDate,
  }: {
    amount: string
    categoryId: string
    lender: string
    dueDate: string
  }) => void
}

export const DebtsNumberPad = ({ addDebt }: DebtsNumberPadProps) => {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false)
  const [lenderName, setLenderName] = useState('')
  const [dueDate, setDueDate] = useState('')

  const { amount, resetAmount, handleNumberPress, handleDeletePress } = useNumberPad()

  const handleOnSave = () => {
    if (amount && amount !== '0') {
      setIsDebtModalOpen(true)
    }
  }

  const handleSubmit = () => {
    if (lenderName.trim() && dueDate) {
      const { id } = DEBT_CATEGORIES[selectedCategory]
      addDebt({
        amount,
        categoryId: id,
        lender: lenderName.trim(),
        dueDate,
      })
      resetAmount()
      setLenderName('')
      setDueDate('')
      setIsDebtModalOpen(false)
    }
  }

  return (
    <>
      <div className="flex flex-col h-full p-4">
        {/* Заголовок */}
        <div className="flex justify-center mb-4">
          <div className="bg-zinc-800 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-white">Добавить долг</span>
          </div>
        </div>

        {/* Верхний блок: сумма */}
        <div className="flex justify-center items-center flex-1">
          <div className="text-6xl font-extrabold flex items-center gap-2 text-white">
            <span>{amount.includes('.') ? parseFloat(amount).toFixed(2) : amount}</span>
            <RussianRuble size={48} strokeWidth={3} />
          </div>
        </div>

        {/* Нижний блок: категории, NumberPad и кнопка */}
        <div className="flex-1 flex flex-col justify-end">
          <div className="mb-6">
            <CategoryTabs
              categories={DEBT_CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
          <div className="mb-4">
            <NumberPad onNumberPress={handleNumberPress} onDelete={handleDeletePress} />
          </div>
          <button
            onClick={handleOnSave}
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

      <DebtModal
        open={isDebtModalOpen}
        lenderName={lenderName}
        onchangeLenderName={setLenderName}
        dueDate={dueDate}
        onChangeDueDate={setDueDate}
        onCancel={() => {
          setIsDebtModalOpen(false)
          setLenderName('')
          setDueDate('')
        }}
        onConfirm={handleSubmit}
      />
    </>
  )
}
