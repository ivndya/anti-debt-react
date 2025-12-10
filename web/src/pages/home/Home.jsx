import { useState } from 'react';
import { ExpenseNumberPad } from './components/expense-number-pad/ExpenseNumberPad';
import { IncomeNumberPad } from './components/income-number-pad copy/IncomeNumberPad';

export const Home = () => {
  const [type, setType] = useState('expense');

  return (
    <div className="flex-1 overflow-y-auto p-4 w-full box-border">
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setType('expense')}
          className={`px-4 py-2 rounded-lg 
            ${type === 'expense' ? 'bg-red-600 text-white' : 'bg-[#2D2D2D] text-gray-400'}`}
        >
          Расход
        </button>

        <button
          onClick={() => setType('income')}
          className={`px-4 py-2 rounded-lg 
            ${type === 'income' ? 'bg-green-600 text-white' : 'bg-[#2D2D2D] text-gray-400'}`}
        >
          Доход
        </button>
      </div>
      {type === 'expense' ? <ExpenseNumberPad /> : <IncomeNumberPad />}
    </div>
  );
};
