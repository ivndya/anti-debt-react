import { useMemo, useState } from 'react'
import type { Debt } from '../../../../../shared/types'
import { DebtsFilterMode, DebtsSortDirection, DebtsSortField } from '../types'

interface UseDebtsViewParams {
  debts: Debt[]
}

export const useDebtsView = ({ debts }: UseDebtsViewParams) => {
  // по умолчанию: только невыплаченные
  const [filterMode, setFilterMode] = useState<DebtsFilterMode>('unpaid')
  // по умолчанию: по дате, новые → старые
  const [sortField, setSortField] = useState<DebtsSortField>('date')
  const [sortDirection, setSortDirection] = useState<DebtsSortDirection>('desc')

  const sortedDebts = useMemo(() => {
    let result = [...debts]

    // 1. фильтр по статусу
    if (filterMode === 'unpaid') {
      result = result.filter((d) => !d.paid)
    }

    if (filterMode === 'paid') {
      result = result.filter((d) => d.paid)
    }

    // 2. сортировка
    result.sort((a, b) => {
      if (sortField === 'date') {
        const aTime = new Date(a.date).getTime()
        const bTime = new Date(b.date).getTime()

        if (aTime === bTime) return 0
        const cmp = aTime < bTime ? -1 : 1
        return sortDirection === 'asc' ? cmp : -cmp
      }

      if (sortField === 'amount') {
        const aValue = a.remainingAmount ?? a.amount
        const bValue = b.remainingAmount ?? b.amount

        if (aValue === bValue) return 0
        const cmp = aValue < bValue ? -1 : 1
        return sortDirection === 'asc' ? cmp : -cmp
      }

      return 0
    })

    return result
  }, [debts, filterMode, sortField, sortDirection])

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }

  return {
    sortedDebts,
    filterMode,
    setFilterMode,
    sortField,
    sortDirection,
    setSortField,
    setSortDirection,
    toggleSortDirection,
  }
}
