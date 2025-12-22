import type { DebtsFilterMode, DebtsSortField, DebtsSortDirection } from './types'

interface DebtsFiltersProps {
  filterMode: DebtsFilterMode
  sortField: DebtsSortField
  sortDirection: DebtsSortDirection
  onFilterModeChange: (mode: DebtsFilterMode) => void
  onSortFieldChange: (field: DebtsSortField) => void
  onToggleSortDirection: () => void
}

const FILTER_OPTIONS: { label: string; value: DebtsFilterMode }[] = [
  { label: 'Только невыплаченные', value: 'unpaid' },
  { label: 'Выплаченные долги', value: 'paid' },
  { label: 'Все долги', value: 'all' },
]

const SORT_FIELD_OPTIONS: { label: string; value: DebtsSortField }[] = [
  { label: 'По дате выплаты', value: 'dueDate' },
  { label: 'По дате', value: 'date' },
  { label: 'По сумме', value: 'amount' },
]

export const DebtsFilters = ({
  filterMode,
  sortField,
  sortDirection,
  onFilterModeChange,
  onSortFieldChange,
  onToggleSortDirection,
}: DebtsFiltersProps) => {
  const isDateSort = sortField === 'date' || sortField === 'dueDate'

  return (
    <div className="flex flex-col gap-4 text-sm text-gray-300">
      {/* Сортировка по полю */}
      <div className="flex flex-col gap-2">
        <span className="text-[12px] text-gray-400">Сортировать по</span>
        <div className="flex gap-3 flex-wrap">
          {SORT_FIELD_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer ${
                sortField === option.value
                  ? 'bg-[#1F1F1F] border-gray-400 text-gray-100'
                  : 'bg-[#1F1F1F] border-[#3D3D3D] text-gray-400'
              }`}
            >
              <input
                type="radio"
                name="debts-sort-field"
                value={option.value}
                checked={sortField === option.value}
                onChange={() => onSortFieldChange(option.value)}
                className="hidden"
              />
              <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                {sortField === option.value && (
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                )}
              </span>
              <span className="leading-snug">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Направление сортировки */}
      <div className="flex flex-col gap-2">
        <span className="text-[12px] text-gray-400">Направление</span>
        <button
          type="button"
          onClick={onToggleSortDirection}
          className="bg-[#1F1F1F] text-gray-200 rounded-xl px-3 py-2 border border-[#3D3D3D] text-left text-sm"
        >
          {isDateSort
            ? sortDirection === 'desc'
              ? 'Новые → старые'
              : 'Старые → новые'
            : sortDirection === 'desc'
              ? 'Сумма: по убыв.'
              : 'Сумма: по возр.'}
        </button>
      </div>

      {/* Фильтр по статусу */}
      <div className="flex flex-col gap-2">
        <span className="text-[12px] text-gray-400">Статус</span>
        <div className="flex gap-3 flex-wrap">
          {FILTER_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer ${
                filterMode === option.value
                  ? 'bg-[#1F1F1F] border-gray-400 text-gray-100'
                  : 'bg-[#1F1F1F] border-[#3D3D3D] text-gray-400'
              }`}
            >
              <input
                type="radio"
                name="debts-status"
                value={option.value}
                checked={filterMode === option.value}
                onChange={() => onFilterModeChange(option.value)}
                className="hidden"
              />
              <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                {filterMode === option.value && (
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                )}
              </span>
              <span className="leading-snug">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
