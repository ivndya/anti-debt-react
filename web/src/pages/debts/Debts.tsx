import { DebtsList } from './components/debts-list/DebtsList'
import { DebtsNumberPad } from './components/debts-number-pad/DebtsNumberPad'
import { useDebts } from '../../hooks/useDebts'
import { FINANCIAL_TIPS } from '../../shared/finance-context/mocks/financialTips'
import { useState } from 'react'
import { useDebtsView } from './components/sorting/hooks/useDebtsView'
import { DebtsFiltersModal } from './components/sorting/DebtsFilterModal'
import { useToggle } from '../../shared/hooks/useToggle'

export const Debts = () => {
  const { debts, addDebt, deleteDebt } = useDebts()

  const {
    sortedDebts,
    filterMode,
    setFilterMode,
    sortField,
    sortDirection,
    setSortField,
    toggleSortDirection,
  } = useDebtsView({ debts })

  // Случайный совет выбирается один раз при монтировании
  const [randomTip] = useState(() => {
    const randomIndex = Math.floor(Math.random() * FINANCIAL_TIPS.length)
    return FINANCIAL_TIPS[randomIndex]
  })

  const { state: isFiltersOpen, toggle: toggleFiltersModal } = useToggle()

  return (
    <div className="flex-1 overflow-y-auto p-4 w-full box-border">
      <DebtsNumberPad addDebt={addDebt} />

      <div className="bg-[#2D2D2D] rounded-2xl p-4 mb-4">
        <div className="text-sm leading-relaxed text-gray-300">{randomTip.text}</div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="text-xl font-bold text-white">Долги</div>
        <button
          type="button"
          onClick={toggleFiltersModal}
          className="bg-[#1F1F1F] text-gray-200 rounded-lg px-3 py-1 border border-[#3D3D3D] text-xs"
        >
          Фильтры
        </button>
      </div>

      <DebtsList debts={sortedDebts} onDeleteDebt={deleteDebt} />

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
    </div>
  )
}
