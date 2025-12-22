import { DEBT_CATEGORIES_MAP } from '../../../../shared/consts/categories/debts'
import { DebtsListProps } from '../../../../shared/types'

const formatDate = (date: string) => {
  if (!date) return ''

  const d = new Date(date)

  if (isNaN(d.getTime())) return ''

  return d.toLocaleDateString('ru-RU')
}

const getProgressColor = (progress: number) => {
  if (progress >= 100) return '#22c55e'
  if (progress >= 66) return '#4ade80'
  if (progress >= 33) return '#eab308'
  return '#ef4444'
}

export const DebtsList: React.FC<DebtsListProps> = ({ debts, onSelectDebt }) => {
  if (debts.length === 0) {
    return (
      <div className="bg-[#3D3D3D] rounded-2xl p-8 text-center">
        <div className="text-gray-500">Долгов пока нет.</div>
      </div>
    )
  }

  const today = new Date()

  return (
    <div>
      {debts.map((debt) => {
        const category = DEBT_CATEGORIES_MAP[debt.categoryId]
        const remaining = debt.remainingAmount ?? debt.amount
        const progress =
          debt.amount > 0
            ? Math.min(100, Math.max(0, ((debt.amount - remaining) / debt.amount) * 100))
            : 0

        const due = new Date(debt.dueDate)
        const isOverdue = !debt.paid && due < today

        // Проверяем, осталось ли меньше недели до срока выплаты
        const oneWeekFromNow = new Date(today)
        oneWeekFromNow.setDate(today.getDate() + 7)
        const isDueSoon = !debt.paid && !isOverdue && due <= oneWeekFromNow

        // Определяем цвет даты
        const dueDateColor = isOverdue
          ? 'text-red-500'
          : isDueSoon
            ? 'text-yellow-500'
            : 'text-gray-500'

        return (
          <div
            key={debt.id}
            onClick={() => onSelectDebt(debt)}
            className="bg-[#3D3D3D] rounded-xl p-4 m-4 mb-3 flex items-center justify-between cursor-pointer transition-colors duration-200 hover:bg-[#343434]"
          >
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-semibold text-lg text-white">{remaining.toFixed(2)} ₽</span>
              </div>

              <div className="text-gray-400 text-sm">Должен: {debt.lender}</div>

              <div className="text-gray-400 text-xs mb-1">Всего: {debt.amount.toFixed(2)} ₽</div>

              <div className={`text-xs ${dueDateColor}`}>
                Вернуть до: {formatDate(debt.dueDate)}
              </div>

              <div className="text-gray-500 text-xs">Категория: {category.name}</div>

              <div className="mt-3">
                <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                  <span>Прогресс выплаты</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${progress}%`, backgroundColor: getProgressColor(progress) }}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
