import { ChangeDebtModalProps } from '../../../../shared/types'

export const ChangeDebtModal: React.FC<ChangeDebtModalProps> = ({
  open,
  debt,
  payAmount,
  onChangePayAmount,
  onCancel,
  onPay,
}) => {
  if (!open || !debt) return null

  const remaining = debt.remainingAmount ?? debt.amount

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#2D2D2D] rounded-2xl p-6 w-full max-w-96">
        <h2 className="text-xl font-bold mb-4 text-white">Погасить долг</h2>

        <div className="bg-[#1A1A1A] rounded-lg p-4 mb-4">
          <div className="text-sm text-gray-400 mb-1">Кредитор</div>
          <div className="text-white font-semibold mb-2">{debt.lender}</div>
          <div className="text-gray-300 text-sm">Осталось выплатить: {remaining.toFixed(2)} ₽</div>
          <div className="text-gray-500 text-xs">Всего долг: {debt.amount.toFixed(2)} ₽</div>
        </div>

        <label className="block text-sm text-gray-300 mb-2">Сколько выплатить сейчас?</label>
        <input
          type="number"
          min={0}
          max={remaining}
          step={0.01}
          value={payAmount}
          onChange={(e) => onChangePayAmount(e.target.value)}
          placeholder="Введите сумму"
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
            onClick={onPay}
            disabled={!payAmount || Number(payAmount) <= 0}
            className={`flex-1 p-3 rounded-lg font-semibold transition-colors duration-200 ${
              !payAmount || Number(payAmount) <= 0
                ? 'bg-[#3D3D3D] text-gray-500 cursor-not-allowed'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            Выплатить
          </button>
        </div>
      </div>
    </div>
  )
}
