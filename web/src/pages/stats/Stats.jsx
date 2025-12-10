import { useState, useMemo } from 'react';
import { useFinance } from '../../shared/finance-context/FinanceContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Stats = ({ healthIndex, healthLabel }) => {
  const [chartMode, setChartMode] = useState('finance'); // 'finance' или 'debts'
  const [showIncome, setShowIncome] = useState(true);
  const [showExpense, setShowExpense] = useState(true);
  
  const { incomes, expenses, debts } = useFinance();

  // Вычисляем статистику по долгам
  const stats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Новые долги за текущий месяц
    const newDebts = debts.filter(debt => {
      const debtDate = new Date(debt.date);
      return debtDate.getMonth() === currentMonth && 
             debtDate.getFullYear() === currentYear &&
             !debt.paid;
    }).length;

    // Погашенные долги за текущий месяц
    const paidDebts = debts.filter(debt => {
      const debtDate = new Date(debt.date);
      return debtDate.getMonth() === currentMonth && 
             debtDate.getFullYear() === currentYear &&
             debt.paid;
    }).length;

    // Общая сумма непогашенных долгов
    const totalAmount = debts
      .filter(debt => !debt.paid)
      .reduce((sum, debt) => sum + debt.amount, 0);

    return { newDebts, paidDebts, totalAmount };
  }, [debts]);

  // Группируем данные по месяцам
  const chartData = useMemo(() => {
    const monthsMap = {};
    const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

    if (chartMode === 'finance') {
      // Обрабатываем доходы
      incomes.forEach(income => {
        const date = new Date(income.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthsMap[monthKey]) {
          monthsMap[monthKey] = { 
            income: 0, 
            expense: 0, 
            date,
            name: monthNames[date.getMonth()]
          };
        }
        monthsMap[monthKey].income += income.amount;
      });

      // Обрабатываем расходы
      expenses.forEach(expense => {
        const date = new Date(expense.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthsMap[monthKey]) {
          monthsMap[monthKey] = { 
            income: 0, 
            expense: 0, 
            date,
            name: monthNames[date.getMonth()]
          };
        }
        monthsMap[monthKey].expense += expense.amount;
      });

      // Преобразуем в массив и сортируем по дате
      return Object.entries(monthsMap)
        .map(([key, data]) => ({
          name: data.name,
          date: data.date,
          Доход: showIncome ? data.income : 0,
          Расход: showExpense ? data.expense : 0,
        }))
        .sort((a, b) => a.date - b.date)
        .slice(-6);
    } else {
      // Обрабатываем долги
      debts.forEach(debt => {
        const date = new Date(debt.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthsMap[monthKey]) {
          monthsMap[monthKey] = { 
            debts: 0,
            date,
            name: monthNames[date.getMonth()]
          };
        }
        monthsMap[monthKey].debts += debt.amount;
      });

      // Преобразуем в массив и сортируем по дате
      return Object.entries(monthsMap)
        .map(([key, data]) => ({
          name: data.name,
          date: data.date,
          Долги: data.debts,
        }))
        .sort((a, b) => a.date - b.date)
        .slice(-6);
    }
  }, [incomes, expenses, debts, showIncome, showExpense, chartMode]);

  return (
    <div className="flex-1 overflow-y-auto p-4 w-full box-border [&_*]:!outline-none">
      <div className="bg-[#2D2D2D] rounded-2xl p-4 mb-4">
        <div className="text-lg font-semibold mb-4 text-white">Финансовая статистика</div>

        {/* График расходов/доходов */}
        <div className="bg-[#3D3D3D] rounded-xl mb-4 p-4 [&_.recharts-surface]:outline-none [&_.recharts-wrapper]:outline-none">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#999', fontSize: 12 }}
                stroke="#555"
              />
              <YAxis 
                tick={{ fill: '#999', fontSize: 12 }}
                stroke="#555"
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#2D2D2D', 
                  border: '1px solid #555',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value) => `${value.toLocaleString()} ₽`}
              />
              <Legend 
                wrapperStyle={{ color: '#fff' }}
                iconType="circle"
              />
              {chartMode === 'finance' ? (
                <>
                  {showIncome && (
                    <Bar 
                      dataKey="Доход" 
                      fill="#4ade80" 
                      radius={[8, 8, 0, 0]}
                    />
                  )}
                  {showExpense && (
                    <Bar 
                      dataKey="Расход" 
                      fill="#f87171" 
                      radius={[8, 8, 0, 0]}
                    />
                  )}
                </>
              ) : (
                <Bar 
                  dataKey="Долги" 
                  fill="#3b82f6" 
                  radius={[8, 8, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 w-full flex justify-around mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.newDebts}</div>
            <div className="text-xs text-gray-500">Новые (в тек. мес.)</div>
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

        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => {
              if (chartMode === 'debts') {
                setChartMode('finance');
                setShowIncome(true);
              } else {
                setShowIncome(!showIncome);
              }
            }}
            className={`flex-1 h-12 rounded transition-all font-semibold text-white ${
              chartMode === 'finance'
                ? showIncome 
                  ? 'bg-green-400 shadow-lg shadow-green-400/50' 
                  : 'bg-green-400/30'
                : 'bg-green-400/20 opacity-50'
            }`}
          >
            Доход
          </button>
          <button 
            onClick={() => {
              if (chartMode === 'debts') {
                setChartMode('finance');
                setShowExpense(true);
              } else {
                setShowExpense(!showExpense);
              }
            }}
            className={`flex-1 h-12 rounded transition-all font-semibold text-white ${
              chartMode === 'finance'
                ? showExpense 
                  ? 'bg-red-400 shadow-lg shadow-red-400/50' 
                  : 'bg-red-400/30'
                : 'bg-red-400/20 opacity-50'
            }`}
          >
            Расход
          </button>
          <button 
            onClick={() => setChartMode(chartMode === 'debts' ? 'finance' : 'debts')}
            className={`flex-1 h-12 rounded transition-all font-semibold text-white ${
              chartMode === 'debts'
                ? 'bg-blue-500 shadow-lg shadow-blue-500/50' 
                : 'bg-blue-500/30'
            }`}
          >
            Долги
          </button>
        </div>

       
      </div>

      <div className="bg-[#2D2D2D] rounded-2xl p-4">
        <div className="text-lg font-semibold mb-3 text-white">Транзакции</div>
        <div className="space-y-2">
          {/* Объединяем все транзакции */}
          {[
            ...incomes.map(income => ({ ...income, type: 'income' })),
            ...expenses.map(expense => ({ ...expense, type: 'expense' })),
            ...debts.map(debt => ({ ...debt, type: 'debt' }))
          ]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10)
            .map((transaction, index) => {
              const date = new Date(transaction.date);
              const dateStr = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
              
              return (
                <div key={`${transaction.type}-${transaction.id}`} className="bg-[#3D3D3D] rounded-lg p-3 flex justify-between items-center">
                  <div className="flex flex-col">
                    <div className="text-white font-medium text-sm">
                      {transaction.type === 'income' ? transaction.source : 
                       transaction.type === 'expense' ? transaction.description : 
                       transaction.lender}
                    </div>
                    <div className="text-gray-500 text-xs">{dateStr}</div>
                  </div>
                  <div className={`font-bold ${
                    transaction.type === 'income' ? 'text-green-400' : 
                    transaction.type === 'expense' ? 'text-red-400' : 
                    'text-blue-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString()} ₽
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
