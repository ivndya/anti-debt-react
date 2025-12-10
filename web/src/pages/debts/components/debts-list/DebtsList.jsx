import { Trash2 } from 'lucide-react';
import { DEBT_CATEGORIES_MAP } from '../../../../shared/consts/categories/debts';

export const DebtsList = ({ debts, onDeleteDebt }) => {
  if (debts.length === 0) {
    return (
      <div className="bg-[#2D2D2D] rounded-2xl p-8 text-center">
        <div className="text-gray-500">
          Долгов пока нет.
          <br />
          Добавьте первый долг на главном экране.
        </div>
      </div>
    );
  }

  return (
    <div>
      {debts.map((debt) => {
        const category = DEBT_CATEGORIES_MAP[debt.categoryId];

        return (
          <div
            key={debt.id}
            className="bg-[#2D2D2D] rounded-xl p-4 mb-3 flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-semibold text-lg text-white">
                  {debt.amount} ₽
                </span>
              </div>
              <div className="text-gray-400 text-sm mb-0.5">
                Должен: {debt.lender}
              </div>
              <div className="text-gray-500 text-xs">
                Категория: {category.name}
              </div>
            </div>
            <button
              onClick={() => onDeleteDebt(debt.id)}
              className="bg-black w-12 h-12 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors duration-200 hover:bg-gray-900"
            >
              <Trash2 size={20} color="white" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
