import { useState, useMemo } from 'react'
import { useFinance } from '../../shared/finance-context/FinanceContext'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { StatsProps, Debt, Income, Expense, DebtPayment } from '../../shared/types'

// Типы для chartData
interface MonthDataFinance {
  name: string
  date: Date
  Доход: number
  Расход: number
}

interface MonthDataDebts {
  name: string
  date: Date
  Долги: number
}

interface MonthMapFinance {
  income: number
  expense: number
  date: Date
  name: string
}

interface MonthMapDebts {
  debts: number
  date: Date
  name: string
}

// Тип объединённой транзакции
type TransactionItem =
  | (Income & { type: 'income' })
  | (Expense & { type: 'expense' })
  | (Debt & { type: 'debt' })
  | (DebtPayment & { type: 'debtPayment' })

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  const [chartMode, setChartMode] = useState<'finance' | 'debts'>('finance')
  const [showIncome, setShowIncome] = useState(true)
  const [showExpense, setShowExpense] = useState(true)
  const [timeMode, setTimeMode] = useState<'month' | 'day'>('month')

  const { incomes, expenses, debts, debtPayments, balance } = useFinance()

  // ----------------- Данные для графика -----------------
  const chartData = useMemo(() => {
    const monthNames = [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Июн',
      'Июл',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек',
    ]

    if (timeMode === 'day') {
      // Группировка по дням
      if (chartMode === 'finance') {
        const daysMap: Record<string, MonthMapFinance> = {}

        incomes.forEach((income) => {
          const date = new Date(income.date)
          const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
          const dayName = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`
          if (!daysMap[dayKey]) daysMap[dayKey] = { income: 0, expense: 0, date, name: dayName }
          daysMap[dayKey].income += Number(income.amount)
        })

        expenses.forEach((expense) => {
          const date = new Date(expense.date)
          const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
          const dayName = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`
          if (!daysMap[dayKey]) daysMap[dayKey] = { income: 0, expense: 0, date, name: dayName }
          daysMap[dayKey].expense += Number(expense.amount)
        })

        return Object.values(daysMap)
          .map((data) => ({
            name: data.name,
            date: data.date,
            Доход: showIncome ? data.income : 0,
            Расход: showExpense ? data.expense : 0,
          }))
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .slice(-14) as MonthDataFinance[]
      } else {
        const daysMap: Record<string, MonthMapDebts> = {}

        debts.forEach((debt) => {
          const date = new Date(debt.date)
          const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
          const dayName = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`
          if (!daysMap[dayKey]) daysMap[dayKey] = { debts: 0, date, name: dayName }
          daysMap[dayKey].debts += Number(debt.amount)
        })

        return Object.values(daysMap)
          .map((data) => ({
            name: data.name,
            date: data.date,
            Долги: data.debts,
          }))
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .slice(-14) as MonthDataDebts[]
      }
    }

    // Группировка по месяцам (оригинальная логика)
    if (chartMode === 'finance') {
      const monthsMap: Record<string, MonthMapFinance> = {}

      incomes.forEach((income) => {
        const date = new Date(income.date)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        if (!monthsMap[monthKey])
          monthsMap[monthKey] = { income: 0, expense: 0, date, name: monthNames[date.getMonth()] }
        monthsMap[monthKey].income += Number(income.amount)
      })

      expenses.forEach((expense) => {
        const date = new Date(expense.date)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        if (!monthsMap[monthKey])
          monthsMap[monthKey] = { income: 0, expense: 0, date, name: monthNames[date.getMonth()] }
        monthsMap[monthKey].expense += Number(expense.amount)
      })

      return Object.values(monthsMap)
        .map((data) => ({
          name: data.name,
          date: data.date,
          Доход: showIncome ? data.income : 0,
          Расход: showExpense ? data.expense : 0,
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(-6) as MonthDataFinance[]
    } else {
      const monthsMap: Record<string, MonthMapDebts> = {}

      debts.forEach((debt) => {
        const date = new Date(debt.date)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        if (!monthsMap[monthKey])
          monthsMap[monthKey] = { debts: 0, date, name: monthNames[date.getMonth()] }
        monthsMap[monthKey].debts += Number(debt.amount)
      })

      return Object.values(monthsMap)
        .map((data) => ({
          name: data.name,
          date: data.date,
          Долги: data.debts,
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(-6) as MonthDataDebts[]
    }
  }, [incomes, expenses, debts, showIncome, showExpense, chartMode, timeMode])

  // ----------------- Объединение транзакций -----------------
  const transactions: TransactionItem[] = useMemo(() => {
    return [
      ...incomes.map((income) => ({ ...income, type: 'income' as const })),
      ...expenses.map((expense) => ({ ...expense, type: 'expense' as const })),
      ...debts.map((debt) => ({ ...debt, type: 'debt' as const })),
      ...debtPayments.map((payment) => ({ ...payment, type: 'debtPayment' as const })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10)
  }, [incomes, expenses, debts, debtPayments])

  // ----------------- Отображение -----------------
  return (
    <div className="flex-1 overflow-y-auto p-4 w-full box-border [&_*]:!outline-none">
      {/* Финансовая статистика + график */}
      <div className="rounded-2xl p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold text-white">Финансовая статистика</div>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeMode('month')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                timeMode === 'month'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-purple-500/30 text-white/70'
              }`}
            >
              Месяц
            </button>
            <button
              onClick={() => setTimeMode('day')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                timeMode === 'day'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-purple-500/30 text-white/70'
              }`}
            >
              День
            </button>
          </div>
        </div>

        <div className="rounded-xl mb-4 p-4 [&_.recharts-surface]:outline-none [&_.recharts-wrapper]:outline-none">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ left: -20, right: 10, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="name" tick={{ fill: '#999', fontSize: 12 }} stroke="#555" />
              <YAxis
                tick={{ fill: '#999', fontSize: 12 }}
                stroke="#555"
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                cursor={{ fill: '#1a1a1a', opacity: 0.3 }}
                formatter={(value, name) => {
                  const num = Number(value) || 0
                  const formatted = num.toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                  return [`${formatted} ₽`, name]
                }}
              />
              <Legend wrapperStyle={{ color: '#fff' }} iconType="circle" />
              {chartMode === 'finance' ? (
                <>
                  {showIncome && <Bar dataKey="Доход" fill="#4ade80" radius={[8, 8, 0, 0]} />}
                  {showExpense && <Bar dataKey="Расход" fill="#f87171" radius={[8, 8, 0, 0]} />}
                </>
              ) : (
                <Bar dataKey="Долги" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Статистика долгов */}
        <div className="mt-4 w-full flex justify-around mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.totalDebtsCount}</div>
            <div className="text-xs text-gray-500">Всего долгов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.paidDebtsCount}</div>
            <div className="text-xs text-gray-500">Погашено</div>
          </div>
        </div>
        <div className="flex justify-around mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{balance.toLocaleString()} ₽</div>
            <div className="text-xs text-gray-500">Общий баланс</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              {stats.unpaidAmount.toLocaleString()} ₽
            </div>
            <div className="text-xs text-gray-500">Сумма непогашенных</div>
          </div>
        </div>

        {/* Кнопки переключения */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() =>
              chartMode === 'debts'
                ? (setChartMode('finance'), setShowIncome(true))
                : setShowIncome(!showIncome)
            }
            className={`flex-1 h-12 rounded transition-all font-semibold text-white ${chartMode === 'finance' ? (showIncome ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-green-400/30') : 'bg-green-400/20 opacity-50'}`}
          >
            Доход
          </button>
          <button
            onClick={() =>
              chartMode === 'debts'
                ? (setChartMode('finance'), setShowExpense(true))
                : setShowExpense(!showExpense)
            }
            className={`flex-1 h-12 rounded transition-all font-semibold text-white ${chartMode === 'finance' ? (showExpense ? 'bg-red-400 shadow-lg shadow-red-400/50' : 'bg-red-400/30') : 'bg-red-400/20 opacity-50'}`}
          >
            Расход
          </button>
          <button
            onClick={() => setChartMode(chartMode === 'debts' ? 'finance' : 'debts')}
            className={`flex-1 h-12 rounded transition-all font-semibold text-white ${chartMode === 'debts' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-blue-500/30'}`}
          >
            Долги
          </button>
        </div>
      </div>

      {/* Список транзакций */}
      <div className="rounded-2xl p-4">
        <div className="text-lg font-semibold mb-3 text-white">Транзакции</div>
        <div className="space-y-2">
          {transactions.map((t) => {
            const date = new Date(t.date)
            const dateStr = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`
            return (
              <div
                key={`${t.type}-${t.id}`}
                className="bg-[#3D3D3D] rounded-lg p-3 flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <div className="text-white font-medium text-sm">
                    {t.type === 'income'
                      ? t.source
                      : t.type === 'expense'
                        ? (t.description ?? '')
                        : t.type === 'debtPayment'
                          ? `Выплата: ${t.lender}`
                          : t.lender}
                  </div>
                  <div className="text-gray-500 text-xs">{dateStr}</div>
                </div>
                <div
                  className={`font-bold ${t.type === 'income' ? 'text-green-400' : t.type === 'expense' ? 'text-red-400' : t.type === 'debtPayment' ? 'text-purple-400' : 'text-blue-400'}`}
                >
                  {t.type === 'income' ? '+' : '-'}
                  {t.amount.toLocaleString()} ₽
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
