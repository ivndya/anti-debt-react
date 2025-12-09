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
    { name: 'Работа', color: '#95E1D3' }
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
        paid: false
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
    const updatedDebts = debts.filter(d => d.id !== id);
    setDebts(updatedDebts);
    saveDebts(updatedDebts);
  };

  const getMonthlyStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const monthlyDebts = debts.filter(debt => {
      const debtDate = new Date(debt.date);
      return debtDate.getMonth() === currentMonth && 
             debtDate.getFullYear() === currentYear;
    });

    const newDebts = monthlyDebts.filter(d => !d.paid).length;
    const paidDebts = monthlyDebts.filter(d => d.paid).length;
    const totalAmount = monthlyDebts.reduce((sum, d) => sum + d.amount, 0);

    return { newDebts, paidDebts, totalAmount };
  };

  const calculateFinancialHealth = () => {
    const totalDebt = debts.filter(d => !d.paid).reduce((sum, d) => sum + d.amount, 0);
    if (totalDebt === 0) return 0;
    if (totalDebt < 5000) return 1;
    if (totalDebt < 15000) return 2;
    return 3;
  };

  const HomeScreen = () => (
    <div style={styles.screen}>
      <div style={styles.numpadCard}>
        <div style={styles.amountDisplay}>{amount}</div>
        
        <div style={styles.categoriesRow}>
  {categories.map((cat, idx) => (
    <div
      key={idx}
      onClick={() => setSelectedCategory(idx)}
      style={{
        ...styles.categoryCard,
        backgroundColor: selectedCategory === idx ? cat.color : '#3D3D3D',
        transform: selectedCategory === idx ? 'scale(1.1)' : 'scale(1)',
        boxShadow: selectedCategory === idx ? '0 0 12px rgba(255,255,255,0.3)' : 'none'
      }}
    >
      <div style={styles.categoryCircle}>
        <span style={styles.categoryText}>{cat.name}</span>
      </div>
    </div>
  ))}
</div>


        <div style={styles.numpadGrid}>
          {[['7','8','9'], ['4','5','6'], ['1','2','3']].map((row, i) => (
            <div key={i} style={styles.numpadRow}>
              {row.map(num => (
                <button
                  key={num}
                  onClick={() => handleNumberPress(num)}
                  style={styles.numButton}
                >
                  <span style={styles.numButtonText}>{num}</span>
                </button>
              ))}
            </div>
          ))}
          <div style={styles.numpadRow}>
            <button onClick={handleDelete} style={styles.numButton}>
              <X size={28} color="white" />
            </button>
            <button onClick={() => handleNumberPress('0')} style={styles.numButton}>
              <span style={styles.numButtonText}>0</span>
            </button>
            <button onClick={handleSave} style={styles.numButton}>
              <Check size={28} color="white" />
            </button>
          </div>
        </div>

        <button onClick={handleSave} style={styles.saveButton}>
          <span style={styles.saveButtonText}>Сохранить</span>
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
      'Критическая ситуация'
    ];

    return (
      <div style={styles.screen}>
        <div style={styles.statsCard}>
          <div style={styles.statsTitle}>Месяц</div>
          
          <div style={styles.chartPlaceholder}>
            <div style={styles.chartText}>График</div>
            <div style={styles.statsRow}>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>{stats.newDebts}</div>
                <div style={styles.statLabel}>Новые</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>{stats.paidDebts}</div>
                <div style={styles.statLabel}>Погашено</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>{stats.totalAmount}</div>
                <div style={styles.statLabel}>Всего ₽</div>
              </div>
            </div>
          </div>

          <div style={styles.colorBars}>
            <div style={{...styles.colorBar, backgroundColor: '#4ADE80'}} />
            <div style={{...styles.colorBar, backgroundColor: '#F87171'}} />
          </div>

          <div style={styles.healthIndex}>
            <div style={styles.healthText}>
              Индекс вашего финансового здоровья = {healthIndex}
            </div>
            <div style={styles.healthLabel}>
              {healthLabels[healthIndex]}
            </div>
          </div>
        </div>

        <div style={styles.transactionsCard}>
          <div style={styles.transactionsTitle}>Транзакции</div>
          <div style={styles.transactionPlaceholder} />
          <div style={{...styles.transactionPlaceholder, marginTop: '8px'}} />
        </div>
      </div>
    );
  };

  const DebtsScreen = () => (
    <div style={styles.screen}>
      <div style={styles.adviceCard}>
        <div style={styles.adviceText}>
          Учитывая, что вы заработали 5 рублей, потратили 2, вы можете выплатить долгов на 3 рубля
        </div>
      </div>

      <div style={styles.debtsHeader}>
        <div style={styles.debtsTitle}>Долги</div>
        <div style={styles.filterText}>Фильтр</div>
      </div>

      {debts.length === 0 ? (
        <div style={styles.emptyDebts}>
          <div style={styles.emptyDebtsText}>
            Долгов пока нет.<br/>Добавьте первый долг на главном экране.
          </div>
        </div>
      ) : (
        <div>
          {debts.map(debt => (
            <div key={debt.id} style={styles.debtItem}>
              <div style={styles.debtInfo}>
                <div style={styles.debtAmount}>
                  <div 
                    style={{
                      ...styles.categoryDot,
                      backgroundColor: debt.categoryColor
                    }}
                  />
                  <span style={styles.debtAmountText}>{debt.amount} ₽</span>
                </div>
                <div style={styles.debtDebtor}>
                  Должен: {debt.debtor}
                </div>
                <div style={styles.debtCategory}>
                  Категория: {debt.category}
                </div>
              </div>
              <button onClick={() => deleteDebt(debt.id)} style={styles.deleteButton}>
                <Trash2 size={20} color="white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const BottomNav = () => (
    <div style={styles.bottomNav}>
      <button onClick={() => setActiveScreen('home')} style={styles.navButton}>
        <div style={{
          ...styles.navIcon,
          backgroundColor: activeScreen === 'home' ? '#fff' : '#2D2D2D'
        }}>
          <Home size={24} color={activeScreen === 'home' ? '#000' : '#fff'} />
        </div>
      </button>
      
      <button onClick={() => setActiveScreen('debts')} style={styles.navButton}>
        <div style={{
          ...styles.navIcon,
          backgroundColor: activeScreen === 'debts' ? '#fff' : '#2D2D2D'
        }}>
          <DollarSign size={24} color={activeScreen === 'debts' ? '#000' : '#fff'} />
        </div>
      </button>
      
      <button onClick={() => setActiveScreen('stats')} style={styles.navButton}>
        <div style={{
          ...styles.navIcon,
          backgroundColor: activeScreen === 'stats' ? '#fff' : '#2D2D2D'
        }}>
          <BarChart3 size={24} color={activeScreen === 'stats' ? '#000' : '#fff'} />
        </div>
      </button>
    </div>
  );

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>
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
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Кому вы должны?</h2>
            <input
              type="text"
              value={debtorName}
              onChange={(e) => setDebtorName(e.target.value)}
              placeholder="Введите имя"
              style={styles.modalInput}
            />
            <div style={styles.modalButtons}>
              <button
                onClick={() => {
                  setShowDebtModal(false);
                  setDebtorName('');
                }}
                style={styles.modalCancelButton}
              >
                Отмена
              </button>
              <button onClick={confirmDebt} style={styles.modalConfirmButton}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    maxWidth: '448px',
    margin: '0 auto',
    backgroundColor: '#1A1A1A',
    
    color: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxSizing: 'border-box'
  },
  header: {
    backgroundColor: '#1A1A1A',
    paddingTop: '48px',
    paddingBottom: '16px',
    paddingLeft: '16px',
    paddingRight: '16px',
    borderBottom: '1px solid #2D2D2D',
    width: '100%',
    boxSizing: 'border-box'
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 0,
    color: '#fff'
  },
  screen: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    width: '100%',
    boxSizing: 'border-box'
  },
  numpadCard: {
    backgroundColor: '#2D2D2D',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '16px'
  },
  amountDisplay: {
    fontSize: '48px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '24px',
    color: '#fff'
  },
  categoriesRow: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '24px'
  },
  numpadGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  numpadRow: {
    display: 'flex',
    gap: '8px'
  },
  numButton: {
    flex: 1,
    backgroundColor: '#000',
    height: '64px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  numButtonText: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#3D3D3D',
    padding: '16px',
    borderRadius: '8px',
    marginTop: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  saveButtonText: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: '600',
    color: '#fff'
  },
  statsCard: {
    backgroundColor: '#2D2D2D',
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '16px'
  },
  statsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#fff'
  },
  chartPlaceholder: {
    backgroundColor: '#3D3D3D',
    height: '192px',
    borderRadius: '12px',
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chartText: {
    color: '#888',
    fontSize: '18px'
  },
  statsRow: {
    marginTop: '16px',
    width: '100%',
    paddingLeft: '32px',
    paddingRight: '32px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  statItem: {
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff'
  },
  statLabel: {
    fontSize: '12px',
    color: '#888'
  },
  colorBars: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px'
  },
  colorBar: {
    flex: 1,
    height: '48px',
    borderRadius: '4px'
  },
  healthIndex: {
    backgroundColor: '#3D3D3D',
    padding: '12px',
    borderRadius: '8px'
  },
  healthText: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#fff'
  },
  healthLabel: {
    fontSize: '12px',
    color: '#888',
    marginTop: '4px'
  },
  transactionsCard: {
    backgroundColor: '#2D2D2D',
    borderRadius: '16px',
    padding: '16px'
  },
  transactionsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#fff'
  },
  transactionPlaceholder: {
    backgroundColor: '#3D3D3D',
    height: '64px',
    borderRadius: '8px'
  },
  adviceCard: {
    backgroundColor: '#2D2D2D',
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '16px'
  },
  adviceText: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#ccc'
  },
  debtsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  debtsTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fff'
  },
  filterText: {
    color: '#888'
  },
  emptyDebts: {
    backgroundColor: '#2D2D2D',
    borderRadius: '16px',
    padding: '32px',
    textAlign: 'center'
  },
  emptyDebtsText: {
    color: '#888'
  },
  debtItem: {
    backgroundColor: '#2D2D2D',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  debtInfo: {
    flex: 1
  },
  debtAmount: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px'
  },
  categoryDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginRight: '8px'
  },
  debtAmountText: {
    fontWeight: '600',
    fontSize: '18px',
    color: '#fff'
  },
  debtDebtor: {
    color: '#aaa',
    fontSize: '14px',
    marginBottom: '2px'
  },
  debtCategory: {
    color: '#888',
    fontSize: '12px'
  },
  deleteButton: {
    backgroundColor: '#000',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  bottomNav: {
    display: 'flex',
    backgroundColor: '#2D2D2D',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    paddingTop: '16px',
    paddingBottom: '32px',
    width: '100%',
    boxSizing: 'border-box'
  },
  navButton: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  },
  navIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s'
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    zIndex: 50
  },
  modal: {
    backgroundColor: '#2D2D2D',
    borderRadius: '16px',
    padding: '24px',
    width: '100%',
    maxWidth: '384px'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#fff'
  },
  modalInput: {
    width: '100%',
    border: '1px solid #3D3D3D',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '16px',
    backgroundColor: '#1A1A1A',
    color: '#fff',
    fontSize: '16px'
  },
  modalButtons: {
    display: 'flex',
    gap: '8px'
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#3D3D3D',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    transition: 'background-color 0.2s'
  },
  modalConfirmButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '600',
    color: '#000',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  categoryCard: {
  flex: 1,
  margin: '0 4px',
  borderRadius: '16px',
  padding: '16px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out'
},
categoryCircle: {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.2)',
  transition: 'all 0.2s ease-in-out'
},
categoryText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: '14px',
  textAlign: 'center'
}

};

export default AntiDebtApp;