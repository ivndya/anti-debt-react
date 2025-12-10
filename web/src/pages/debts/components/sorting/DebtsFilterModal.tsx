import { X } from 'lucide-react';
import { DebtsFilters } from './DebtsFilter';
import type { DebtsFilterMode, DebtsSortField, DebtsSortDirection } from './types';

interface DebtsFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filterMode: DebtsFilterMode;
  sortField: DebtsSortField;
  sortDirection: DebtsSortDirection;
  onFilterModeChange: (mode: DebtsFilterMode) => void;
  onSortFieldChange: (field: DebtsSortField) => void;
  onToggleSortDirection: () => void;
}

export const DebtsFiltersModal = ({
  isOpen,
  onClose,
  filterMode,
  sortField,
  sortDirection,
  onFilterModeChange,
  onSortFieldChange,
  onToggleSortDirection,
}: DebtsFiltersModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end justify-center z-50">
      <div className="bg-[#2D2D2D] rounded-t-2xl w-full max-w-[448px] p-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-semibold">Фильтры</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1F1F1F] flex items-center justify-center border border-[#3D3D3D]"
          >
            <X size={18} className="text-gray-300" />
          </button>
        </div>

        <DebtsFilters
          filterMode={filterMode}
          sortField={sortField}
          sortDirection={sortDirection}
          onFilterModeChange={onFilterModeChange}
          onSortFieldChange={onSortFieldChange}
          onToggleSortDirection={onToggleSortDirection}
        />
      </div>
    </div>
  );
};
