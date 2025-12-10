import { DebtsList } from './components/debts-list/DebtsList';
import { useDebts } from '../../hooks/useDebts';
import { DebtsNumberPad } from './components/debts-number-pad/DebtsNumberPad';

export const Debts = () => {
  const { debts, addDebt, deleteDebt } = useDebts();

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 w-full box-border">
        <DebtsNumberPad addDebt={addDebt} />

        <div className="bg-[#2D2D2D] rounded-2xl p-4 mb-4">
          <div className="text-sm leading-relaxed text-gray-300">
            Учитывая, что вы заработали 5 рублей, потратили 2, вы можете
            выплатить долгов на 3 рубля
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="text-xl font-bold text-white">Долги</div>
          <div className="text-gray-500">Фильтр</div>
        </div>

        <DebtsList debts={debts} onDeleteDebt={deleteDebt} />
      </div>
    </>
  );
};
