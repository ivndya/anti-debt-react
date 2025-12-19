import { DebtModalProps } from '../../../../shared/types'

export const DebtModal: React.FC<DebtModalProps> = ({
  open,
  lenderName,
  onchangeLenderName,
  dueDate,
  onChangeDueDate,
  onCancel,
  onConfirm,
}) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#2D2D2D] rounded-2xl p-6 w-full max-w-96">
        <h2 className="text-xl font-bold mb-4 text-white">Кому вы должны?</h2>

        <input
          type="text"
          value={lenderName}
          onChange={(e) => onchangeLenderName(e.target.value)}
          placeholder="Введите имя"
          className="w-full border border-[#3D3D3D] rounded-lg p-3 mb-3 bg-[#1A1A1A] text-white text-base outline-none focus:border-gray-500"
        />
        <label className="block text-sm text-gray-300 mb-1">Выберите дату</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => onChangeDueDate(e.target.value)}
          className="w-full border border-[#3D3D3D] rounded-lg p-3 mb-4 bg-[#1A1A1A] text-white text-base outline-none focus:border-gray-500"
        />

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 bg-[#3D3D3D] p-3 rounded-lg font-semibold text-white transition-colors duration-200 hover:bg-[#4D4D4D]"
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-white p-3 rounded-lg font-semibold text-black transition-colors duration-200 hover:bg-gray-200"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}
