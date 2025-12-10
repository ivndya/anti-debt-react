import { useState } from 'react';
import { useNumberPad } from '../../../../hooks/useNumberPad';
import { CategoryTabs } from '../../../../widgets/category-tabs/CategoryTabs';
import { NumberPad } from '../../../../widgets/number-pad/NumberPad';
import { EXPENSE_CATEGORIES } from '../../../../shared/consts/categories/expenses';
import { useTransactions } from '../../../../hooks/useMoney';
import { TransactionType } from '../../../../shared/types';
import { INCOME_CATEGORIES } from '../../../../shared/consts/categories/incomes';

export const TransactionNumberPad = ({
  transactionType,
}: {
  transactionType: TransactionType;
}) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const { amount, resetAmount, handleNumberPress, handleDeletePress } =
    useNumberPad();

  const { addIncome, addExpense } = useTransactions();

  const handleSubmit = () => {
    if (transactionType === 'expense') {
      const category = EXPENSE_CATEGORIES[selectedCategory];
      addExpense({
        amount,
        categoryId: category.id,
        description: category.name,
      });
    } else if (transactionType === 'income') {
      const category = INCOME_CATEGORIES[selectedCategory];
      addIncome({ amount, categoryId: category.id, source: category.name });
    }

    resetAmount();
  };

  return (
    <>
      <div className="bg-[#2D2D2D] rounded-2xl p-6 mb-4">
        <div className="text-5xl font-bold text-center mb-6 text-white">
          {amount}
        </div>

        <CategoryTabs
          categories={
            transactionType === 'expense'
              ? EXPENSE_CATEGORIES
              : INCOME_CATEGORIES
          }
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <NumberPad
          onNumberPress={handleNumberPress}
          onDelete={handleDeletePress}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-[#3D3D3D] p-4 rounded-lg mt-4 border-none cursor-pointer transition-colors duration-200 hover:bg-[#4D4D4D]"
        >
          <span className="text-center text-lg font-semibold text-white">
            Сохранить
          </span>
        </button>
      </div>
    </>
  );
};
