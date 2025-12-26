import { useEffect, useState } from 'react'
import { DebtsList } from './components/debts-list/DebtsList'
import { DebtsNumberPad } from './components/debts-number-pad/DebtsNumberPad'
import { useDebts } from '../../hooks/useDebts'
import { FINANCIAL_TIPS } from '../../shared/finance-context/mocks/financialTips'
import { useDebtsView } from './components/sorting/hooks/useDebtsView'
import { DebtsFiltersModal } from './components/sorting/DebtsFilterModal'
import { useToggle } from '../../shared/hooks/useToggle'
import { ChangeDebtModal } from './components/change-debt-modal/ChangeDebtModal'
import { Debt } from '../../shared/types'
import { useFinance } from '../../shared/finance-context/FinanceContext'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const Debts = () => {
  const { debts, addDebt, payDebt } = useDebts()
  const { incomes, expenses } = useFinance()

  const {
    sortedDebts,
    filterMode,
    setFilterMode,
    sortField,
    sortDirection,
    setSortField,
    toggleSortDirection,
  } = useDebtsView({ debts })

  const [randomTip] = useState(() => {
    const randomIndex = Math.floor(Math.random() * FINANCIAL_TIPS.length)
    return FINANCIAL_TIPS[randomIndex]
  })

  const [forecastText, setForecastText] = useState<string>('Загрузка стратегии...')

  const { state: isFiltersOpen, toggle: toggleFiltersModal } = useToggle()

  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)
  const [payAmount, setPayAmount] = useState('')

  const closeModal = () => {
    setSelectedDebt(null)
    setPayAmount('')
  }

  const handlePay = () => {
    if (!selectedDebt) return

    const value = parseFloat(payAmount)
    if (isNaN(value) || value <= 0) return

    const remaining = selectedDebt.remainingAmount ?? selectedDebt.amount
    const payment = Math.min(value, remaining)

    if (payment > 0) {
      payDebt(selectedDebt.id, payment)
      closeModal()
    }
  }

  // ====== Fetch прогноз стратегии ======
  useEffect(() => {
    const fetchForecast = async () => {
      if (debts.length === 0) return

      try {
        const response = await fetch(`${API_BASE_URL}/api/generate-debt-advice`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ debts, incomes, expenses }),
        })
        const data = await response.json()
        setForecastText(data.advice)
      } catch (err) {
        console.error('Ошибка при получении прогноза:', err)
        setForecastText('Не удалось загрузить стратегию выплат')
      }
    }

    fetchForecast()
  }, [debts, incomes, expenses])

  return (
    <div className="flex-1 overflow-y-auto p-4 w-full box-border">
      <DebtsNumberPad addDebt={addDebt} />

      <div className="bg-[#3D3D3D] rounded-2xl p-4 m-4 mb-4">
        <div className="text-xs text-gray-400 mb-1">Микросовет</div>
        <div className="text-sm leading-relaxed text-gray-300">{randomTip.text}</div>
      </div>

      <div className="bg-[#3D3D3D] rounded-2xl p-4 m-4 mb-4">
        <div className="text-xs text-gray-400 mb-1">Стратегия выплат</div>
        <div className="text-sm leading-relaxed text-gray-300">{forecastText}</div>
      </div>

      <div className="flex justify-between items-center p-4 mb-3">
        <div className="text-xl font-bold text-white">Долги</div>
        <button
          type="button"
          onClick={toggleFiltersModal}
          className="bg-[#1F1F1F] text-gray-200 rounded-lg px-3 py-1 border border-[#3D3D3D] text-xs"
        >
          Фильтры
        </button>
      </div>

      <DebtsList
        debts={sortedDebts}
        onSelectDebt={(debt) => {
          setSelectedDebt(debt)
          setPayAmount((debt.remainingAmount ?? debt.amount).toString())
        }}
      />

      <DebtsFiltersModal
        isOpen={isFiltersOpen}
        onClose={toggleFiltersModal}
        filterMode={filterMode}
        sortField={sortField}
        sortDirection={sortDirection}
        onFilterModeChange={setFilterMode}
        onSortFieldChange={setSortField}
        onToggleSortDirection={toggleSortDirection}
      />

      <ChangeDebtModal
        open={Boolean(selectedDebt)}
        debt={selectedDebt}
        payAmount={payAmount}
        onChangePayAmount={setPayAmount}
        onCancel={closeModal}
        onPay={handlePay}
      />
    </div>
  )
}
