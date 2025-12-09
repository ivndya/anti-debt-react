import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AntiDebtApp from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#000', // фон вокруг приложения (можно поменять)
      }}
    >
      <AntiDebtApp />
    </div>
  </StrictMode>,
)
