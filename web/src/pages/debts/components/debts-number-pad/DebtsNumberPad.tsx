import { useState } from 'react'
import { useNumberPad } from '../../../../hooks/useNumberPad'
import { DEBT_CATEGORIES } from '../../../../shared/consts/categories/debts'
import { CategoryTabs } from '../../../../widgets/category-tabs/CategoryTabs'
import { NumberPad } from '../../../../widgets/number-pad/NumberPad'
import { DebtModal } from '../debt-modal/DebtModal'
import { RussianRuble } from 'lucide-react'

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
      <div className="p-6 mb-4">
        <div className="text-5xl font-bold text-center mb-6 text-white flex items-center justify-center gap-2">
          <span>{amount}</span>
          <RussianRuble size={40} color="white" />
        </div>

        <CategoryTabs
          categories={DEBT_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <NumberPad onNumberPress={handleNumberPress} onDelete={handleDeletePress} />

        <button
          onClick={handleOnSave}
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
