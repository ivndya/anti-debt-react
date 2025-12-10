import { useState } from 'react';
import { useNumberPad } from '../../../../hooks/useNumberPad';
import { DEBT_CATEGORIES } from '../../../../shared/consts/categories/debts';
import { CategoryTabs } from '../../../../widgets/category-tabs/CategoryTabs';
import { NumberPad } from '../../../../widgets/number-pad/NumberPad';
import { DebtModal } from '../debt-modal/DebtModal';

interface DebtsNumberPadProps {
  addDebt: ({
    amount,
    categoryId,
    lender,
  }: {
    amount: string;
    categoryId: string;
    lender: string;
  }) => void;
}

export const DebtsNumberPad = ({ addDebt }: DebtsNumberPadProps) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);
  const [lenderName, setLenderName] = useState('');

  const { amount, resetAmount, handleNumberPress, handleDeletePress } =
    useNumberPad();

  const handleOnSave = () => {
    if (amount && amount !== '0') {
      setIsDebtModalOpen(true);
    }
  };

  const handleSubmit = () => {
    if (lenderName.trim()) {
      const { id } = DEBT_CATEGORIES[selectedCategory];
      addDebt({
        amount,
        categoryId: id,
        lender: lenderName.trim(),
      });

      resetAmount();
      setLenderName('');
      setIsDebtModalOpen(false);
    }
  };

  return (
    <>
      <div className="bg-[#2D2D2D] rounded-2xl p-6 mb-4">
        <div className="text-5xl font-bold text-center mb-6 text-white">
          {amount}
        </div>

        <CategoryTabs
          categories={DEBT_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <NumberPad
          onNumberPress={handleNumberPress}
          onDelete={handleDeletePress}
        />

        <button
          onClick={handleOnSave}
          className="w-full bg-[#3D3D3D] p-4 rounded-lg mt-4 border-none cursor-pointer transition-colors duration-200 hover:bg-[#4D4D4D]"
        >
          <span className="text-center text-lg font-semibold text-white">
            Сохранить
          </span>
        </button>
      </div>

      <DebtModal
        open={isDebtModalOpen}
        lenderName={lenderName}
        onCancel={() => {
          setIsDebtModalOpen(false);
          setLenderName('');
        }}
        onchangeLenderName={setLenderName}
        onConfirm={handleSubmit}
      />
    </>
  );
};
