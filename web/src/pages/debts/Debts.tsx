import { DebtsList } from './components/debts-list/DebtsList';
import { DebtsNumberPad } from './components/debts-number-pad/DebtsNumberPad';
import { useDebts } from '../../hooks/useDebts';
import { FINANCIAL_TIPS } from '../../shared/finance-context/mocks/financialTips';
import { useMemo } from 'react';

export const Debts = () => {
  const { debts, addDebt, deleteDebt } = useDebts();

  const randomTip = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * FINANCIAL_TIPS.length);
    return FINANCIAL_TIPS[randomIndex];
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-4 w-full box-border">
      <DebtsNumberPad addDebt={addDebt} />

      <div className="bg-[#2D2D2D] rounded-2xl p-4 mb-4">
        <div className="text-sm leading-relaxed text-gray-300">
          {randomTip.text}
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="text-xl font-bold text-white">Долги</div>
        <div className="text-gray-500">Фильтр</div>
      </div>

      <DebtsList debts={debts} onDeleteDebt={deleteDebt} />
    </div>
  );
};
