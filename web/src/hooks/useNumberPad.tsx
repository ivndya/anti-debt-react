import { useState } from 'react'

export const useNumberPad = () => {
  const [amount, setAmount] = useState('0')

  const handleNumberPress = (num: string) => {
    if (num === '.') {
      // добавляем точку только один раз
      if (!amount.includes('.')) {
        setAmount(amount + '.')
      }
      return
    }

    if (amount === '0') {
      setAmount(num)
    } else {
      if (amount.includes('.')) {
        const decimalPart = amount.split('.')[1] || ''
        // ограничение до 2 знаков после точки
        if (decimalPart.length < 2) {
          setAmount(amount + num)
        }
      } else {
        setAmount(amount + num)
      }
    }
  }

  const handleDeletePress = () => {
    if (amount.length > 1) {
      setAmount(amount.slice(0, -1))
    } else {
      setAmount('0')
    }
  }

  const resetAmount = () => setAmount('0')

  return { amount, resetAmount, handleNumberPress, handleDeletePress }
}
