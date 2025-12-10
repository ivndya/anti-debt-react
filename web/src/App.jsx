import { useState, useEffect } from 'react';
import { Home, DollarSign, BarChart3, X, Check, Trash2 } from 'lucide-react';

const AntiDebtApp = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [amount, setAmount] = useState('500');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [debts, setDebts] = useState([]);
  const [showDebtModal, setShowDebtModal] = useState(false);
  const [debtorName, setDebtorName] = useState('');

  const categories = [
    { name: 'Личные', color: '#FF6B6B' },
    { name: 'Семья', color: '#4ECDC4' },
    { name: 'Друзья', color: '#FFD93D' },
    { name: 'Работа', color: '#95E1D3' },
  ];

  useEffect(() => {
    loadDebts();
  }, []);

  const loadDebts = async () => {
    try {
      const stored = await window.storage.get('debts');
      if (stored && stored.value) {
        setDebts(JSON.parse(stored.value));
      }
    } catch (error) {
      console.log('Ключ не найден, начинаем с пустого списка');
    }
  };

  const saveDebts = async (newDebts) => {
    try {
      await window.storage.set('debts', JSON.stringify(newDebts));
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };

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

  const confirmDebt = () => {
    if (debtorName.trim()) {
      const newDebt = {
        id: Date.now(),
        amount: parseInt(amount),
        category: categories[selectedCategory].name,
        categoryColor: categories[selectedCategory].color,
        debtor: debtorName,
        date: new Date().toISOString(),
        paid: false,
      };
      const updatedDebts = [...debts, newDebt];
      setDebts(updatedDebts);
      saveDebts(updatedDebts);
      setAmount('500');
      setDebtorName('');
      setShowDebtModal(false);
    }
  };

  const deleteDebt = (id) => {
    const updatedDebts = debts.filter((d) => d.id !== id);
    setDebts(updatedDebts);
    saveDebts(updatedDebts);
  };

  const getMonthlyStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyDebts = debts.filter((debt) => {
      const debtDate = new Date(debt.date);
      return (
        debtDate.getMonth() === currentMonth && debtDate.getFullYear() === currentYear
      );
    });

    const newDebts = monthlyDebts.filter((d) => !d.paid).length;
    const paidDebts = monthlyDebts.filter((d) => d.paid).length;
    const totalAmount = monthlyDebts.reduce((sum, d) => sum + d.amount, 0);

    return { newDebts, paidDebts, totalAmount };
  };

  const calculateFinancialHealth = () => {
    const totalDebt = debts.filter((d) => !d.paid).reduce((sum, d) => sum + d.amount, 0);
    if (totalDebt === 0) return 0;
    if (totalDebt < 5000) return 1;
    if (totalDebt < 15000) return 2;
    return 3;
  };

  const HomeScreen = () => (
    <div className="flex-1 overflow-y-auto p-4 w-full box-border">
      <div className="bg-[#2D2D2D] rounded-2xl p-6 mb-4">
        <div className="text-5xl font-bold text-center mb-6 text-white">{amount}</div>

        <div className="flex justify-around mb-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCategory(idx)}
              className={`flex-1 mx-1 rounded-2xl py-4 flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out ${
                selectedCategory === idx ? 'scale-110' : 'scale-100'
              }`}
              style={{
                backgroundColor: selectedCategory === idx ? cat.color : '#3D3D3D',
                boxShadow: selectedCategory === idx ? '0 0 12px rgba(255,255,255,0.3)' : 'none',
              }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-black/20 transition-all duration-200">
                <span className="text-white font-semibold text-sm text-center">{cat.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {[
            ['7', '8', '9'],
            ['4', '5', '6'],
            ['1', '2', '3'],
          ].map((row, i) => (
            <div key={i} className="flex gap-2">
              {row.map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberPress(num)}
                  className="flex-1 bg-black h-16 rounded-lg flex items-center justify-center border-none cursor-pointer transition-colors duration-200 hover:bg-gray-900"
                >
                  <span className="text-white text-2xl font-bold">{num}</span>
                </button>
              ))}
            </div>
          ))}
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="flex-1 bg-black h-16 rounded-lg flex items-center justify-center border-none cursor-pointer transition-colors duration-200 hover:bg-gray-900"
            >
              <X size={28} color='white' />
            </button>
            <button
              onClick={() => handleNumberPress('0')}
              className="flex-1 bg-black h-16 rounded-lg flex items-center justify-center border-none cursor-pointer transition-colors duration-200 hover:bg-gray-900"
            >
              <span className="text-white text-2xl font-bold">0</span>
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-black h-16 rounded-lg flex items-center justify-center border-none cursor-pointer transition-colors duration-200 hover:bg-gray-900"
            >
              <Check size={28} color='white' />
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-[#3D3D3D] p-4 rounded-lg mt-4 border-none cursor-pointer transition-colors duration-200 hover:bg-[#4D4D4D]"
        >
          <span className="text-center text-lg font-semibold text-white">Сохранить</span>
        </button>
      </div>
    </div>
  );

  const StatsScreen = () => {
    const stats = getMonthlyStats();
    const healthIndex = calculateFinancialHealth();
    const healthLabels = [
      'Отличное финансовое здоровье!',
      'Хорошее состояние',
      'Нужно быть внимательнее',
      'Критическая ситуация',
    ];

    return (
      <div className="flex-1 overflow-y-auto p-4 w-full box-border">
        <div className="bg-[#2D2D2D] rounded-2xl p-4 mb-4">
          <div className="text-lg font-semibold mb-4 text-white">Месяц</div>

          <div className="bg-[#3D3D3D] h-48 rounded-xl mb-4 flex flex-col items-center justify-center">
            {/* <div className="text-gray-500 text-lg">График</div> */}
            <div className="mt-4 w-full px-8 flex justify-around">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.newDebts}</div>
                <div className="text-xs text-gray-500">Новые</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.paidDebts}</div>
                <div className="text-xs text-gray-500">Погашено</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.totalAmount}</div>
                <div className="text-xs text-gray-500">Всего ₽</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="flex-1 h-12 rounded bg-green-400" />
            <div className="flex-1 h-12 rounded bg-red-400" />
          </div>

          <div className="bg-[#3D3D3D] p-3 rounded-lg">
            <div className="text-sm font-medium text-white">
              Индекс вашего финансового здоровья = {healthIndex}
            </div>
            <div className="text-xs text-gray-500 mt-1">{healthLabels[healthIndex]}</div>
          </div>
        </div>

        <div className="bg-[#2D2D2D] rounded-2xl p-4">
          <div className="text-lg font-semibold mb-2 text-white">Транзакции</div>
          <div className="bg-[#3D3D3D] h-16 rounded-lg" />
          <div className="bg-[#3D3D3D] h-16 rounded-lg mt-2" />
        </div>
      </div>
    );
  };

  const DebtsScreen = () => (
    <div className="flex-1 overflow-y-auto p-4 w-full box-border">
      <div className="bg-[#2D2D2D] rounded-2xl p-4 mb-4">
        <div className="text-sm leading-relaxed text-gray-300">
          Учитывая, что вы заработали 5 рублей, потратили 2, вы можете выплатить долгов на
          3 рубля
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="text-xl font-bold text-white">Долги</div>
        <div className="text-gray-500">Фильтр</div>
      </div>

      {debts.length === 0 ? (
        <div className="bg-[#2D2D2D] rounded-2xl p-8 text-center">
          <div className="text-gray-500">
            Долгов пока нет.
            <br />
            Добавьте первый долг на главном экране.
          </div>
        </div>
      ) : (
        <div>
          {debts.map((debt) => (
            <div
              key={debt.id}
              className="bg-[#2D2D2D] rounded-xl p-4 mb-3 flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: debt.categoryColor }}
                  />
                  <span className="font-semibold text-lg text-white">{debt.amount} ₽</span>
                </div>
                <div className="text-gray-400 text-sm mb-0.5">Должен: {debt.debtor}</div>
                <div className="text-gray-500 text-xs">Категория: {debt.category}</div>
              </div>
              <button
                onClick={() => deleteDebt(debt.id)}
                className="bg-black w-12 h-12 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors duration-200 hover:bg-gray-900"
              >
                <Trash2 size={20} color='white' />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const BottomNav = () => (
    <div className="flex bg-[#2D2D2D] rounded-t-3xl pt-4 pb-8 w-full box-border">
      <button
        onClick={() => setActiveScreen('home')}
        className="flex-1 flex justify-center bg-transparent border-none cursor-pointer"
      >
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-200 ${
            activeScreen === 'home' ? 'bg-white' : 'bg-[#2D2D2D]'
          }`}
        >
          <Home size={24} color={activeScreen === 'home' ? '#000' : '#fff'} />
        </div>
      </button>

      <button
        onClick={() => setActiveScreen('debts')}
        className="flex-1 flex justify-center bg-transparent border-none cursor-pointer"
      >
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-200 ${
            activeScreen === 'debts' ? 'bg-white' : 'bg-[#2D2D2D]'
          }`}
        >
          <DollarSign size={24} color={activeScreen === 'debts' ? '#000' : '#fff'} />
        </div>
      </button>

      <button
        onClick={() => setActiveScreen('stats')}
        className="flex-1 flex justify-center bg-transparent border-none cursor-pointer"
      >
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-200 ${
            activeScreen === 'stats' ? 'bg-white' : 'bg-[#2D2D2D]'
          }`}
        >
          <BarChart3 size={24} color={activeScreen === 'stats' ? '#000' : '#fff'} />
        </div>
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-screen w-full max-w-[448px] mx-auto bg-[#1A1A1A] text-white font-sans box-border">
      <div className="bg-[#1A1A1A] pt-12 pb-4 px-4 border-b border-[#2D2D2D] w-full box-border">
        <h1 className="text-2xl font-bold text-center m-0 text-white">
          {activeScreen === 'home' && 'Главный экран'}
          {activeScreen === 'stats' && 'Статистика'}
          {activeScreen === 'debts' && 'Долги'}
        </h1>
      </div>

      {activeScreen === 'home' && <HomeScreen />}
      {activeScreen === 'stats' && <StatsScreen />}
      {activeScreen === 'debts' && <DebtsScreen />}

      <BottomNav />

      {showDebtModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#2D2D2D] rounded-2xl p-6 w-full max-w-96">
            <h2 className="text-xl font-bold mb-4 text-white">Кому вы должны?</h2>
            <input
              type='text'
              value={debtorName}
              onChange={(e) => setDebtorName(e.target.value)}
              placeholder='Введите имя'
              className="w-full border border-[#3D3D3D] rounded-lg p-3 mb-4 bg-[#1A1A1A] text-white text-base outline-none focus:border-gray-500"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowDebtModal(false);
                  setDebtorName('');
                }}
                className="flex-1 bg-[#3D3D3D] p-3 rounded-lg font-semibold border-none cursor-pointer text-white transition-colors duration-200 hover:bg-[#4D4D4D]"
              >
                Отмена
              </button>
              <button
                onClick={confirmDebt}
                className="flex-1 bg-white p-3 rounded-lg font-semibold text-black border-none cursor-pointer transition-colors duration-200 hover:bg-gray-200"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AntiDebtApp;
