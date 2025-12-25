import { useState } from 'react'
import { useDebts } from './hooks/useDebts'
import { HEALTH_LABELS } from './shared/consts/health'

import { Home } from './pages/home/Home'
import { Stats } from './pages/stats/Stats'
import { Debts } from './pages/debts/Debts'

import { BottomNav } from './widgets/bottom-nav/BottomNav'

const AntiDebtApp = () => {
  const [activeScreen, setActiveScreen] = useState('home')

  const { getMonthlyStats, calculateFinancialHealth } = useDebts()

  const stats = getMonthlyStats()
  const healthIndex = calculateFinancialHealth()
  const healthLabel = HEALTH_LABELS[healthIndex]

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#1A1A1A] text-white font-sans box-border">
      {activeScreen === 'home' && <Home />}

      {activeScreen === 'stats' && (
        <Stats stats={stats} healthIndex={healthIndex} healthLabel={healthLabel} />
      )}

      {activeScreen === 'debts' && <Debts />}

      <BottomNav activeScreen={activeScreen} onChange={setActiveScreen} />
    </div>
  )
}

export default AntiDebtApp
