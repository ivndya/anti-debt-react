import { Trash2 } from 'lucide-react'
import { DEBT_CATEGORIES_MAP } from '../../../../shared/consts/categories/debts'
import { DebtsListProps } from '../../../../shared/types'

const formatDate = (date: string) => {
  if (!date) return ''

  const d = new Date(date)

  if (isNaN(d.getTime())) return ''

  return d.toLocaleDateString('ru-RU')
}

export const DebtsList: React.FC<DebtsListProps> = ({ debts, onDeleteDebt }) => {
  if (debts.length === 0) {
    return (
      <div className="bg-[#2D2D2D] rounded-2xl p-8 text-center">
        <div className="text-gray-500">Долгов пока нет.</div>
      </div>
    )
  }

  const today = new Date()

  return (
    <div>
      {debts.map((debt) => {
        const category = DEBT_CATEGORIES_MAP[debt.categoryId]

        const due = new Date(debt.dueDate)
        const isOverdue = !debt.paid && due < today

        return (
          <div
            key={debt.id}
            className="bg-[#2D2D2D] rounded-xl p-4 mb-3 flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-semibold text-lg text-white">{debt.amount.toFixed(2)} ₽</span>
              </div>

              <div className="text-gray-400 text-sm">Должен: {debt.lender}</div>

              <div className={`text-xs ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
                Вернуть до: {formatDate(debt.dueDate)}
              </div>

              <div className="text-gray-500 text-xs">Категория: {category.name}</div>
            </div>

            <button
              onClick={() => onDeleteDebt(debt.id)}
              className="bg-black w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-gray-900"
            >
              <Trash2 size={20} color="white" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
