import { useState } from 'react';
import { useDebts } from './hooks/useDebts';
import { DEBT_CATEGORIES } from './shared/consts/categories/debts';
import { HEALTH_LABELS } from './shared/consts/health';

import { Home } from './pages/home/Home';
import { Stats } from './pages/stats/Stats';
import { Debts } from './pages/debts/Debts';

import { BottomNav } from './widgets/bottom-nav/BottomNav';
import { DebtModal } from './pages/debts/components/debt-modal/DebtModal';

const AntiDebtApp = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [amount, setAmount] = useState('500');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [showDebtModal, setShowDebtModal] = useState(false);
  const [debtorName, setDebtorName] = useState('');

  const { debts, addDebt, deleteDebt, getMonthlyStats, calculateFinancialHealth } = useDebts();

  const handleNumberPress = (num) => {
    if (amount === '0' || amount === '500') {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
  };

  const handleDelete = () => {
    if (amount.length > 1) {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount('0');
    }
  };

  const handleSave = () => {
    if (amount && amount !== '0') {
      setShowDebtModal(true);
    }
  };

  const handleConfirmDebt = () => {
    if (debtorName.trim()) {
      const categoryObj = DEBT_CATEGORIES[selectedCategory];
      addDebt({
        amount,
        category: categoryObj.name,
        categoryColor: categoryObj.color,
        debtor: debtorName.trim(),
      });

      setAmount('500');
      setDebtorName('');
      setShowDebtModal(false);
    }
  };

  const stats = getMonthlyStats();
  const healthIndex = calculateFinancialHealth();
  const healthLabel = HEALTH_LABELS[healthIndex];

  return (
    <div className="flex flex-col h-screen w-full max-w-[448px] mx-auto bg-[#1A1A1A] text-white font-sans box-border">
      <div className="bg-[#1A1A1A] pt-12 pb-4 px-4 border-b border-[#2D2D2D] w-full box-border">
        <h1 className="text-2xl font-bold text-center m-0 text-white">
          {activeScreen === 'home' && 'Главный экран'}
          {activeScreen === 'stats' && 'Статистика'}
          {activeScreen === 'debts' && 'Долги'}
        </h1>
      </div>

      {activeScreen === 'home' && (
        <Home
          amount={amount}
          categories={DEBT_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onNumberPress={handleNumberPress}
          onDelete={handleDelete}
          onSave={handleSave}
        />
      )}

      {activeScreen === 'stats' && (
        <Stats stats={stats} healthIndex={healthIndex} healthLabel={healthLabel} />
      )}

      {activeScreen === 'debts' && <Debts debts={debts} onDeleteDebt={deleteDebt} />}

      <BottomNav activeScreen={activeScreen} onChange={setActiveScreen} />

      <DebtModal
        open={showDebtModal}
        debtorName={debtorName}
        onChangeDebtorName={setDebtorName}
        onCancel={() => {
          setShowDebtModal(false);
          setDebtorName('');
        }}
        onConfirm={handleConfirmDebt}
      />
    </div>
  );
};

export default AntiDebtApp;
