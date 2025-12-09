import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AntiDebtApp from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div
      style={{
        margin: 0,
        padding: 0,
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
