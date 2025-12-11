import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AntiDebtApp from './App'
import { FinanceProvider } from './shared/finance-context/FinanceProvider'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FinanceProvider>
      <div className="m-0 p-0 flex justify-center items-center min-h-screen bg-black">
        <AntiDebtApp />
      </div>
    </FinanceProvider>
  </StrictMode>,
)
