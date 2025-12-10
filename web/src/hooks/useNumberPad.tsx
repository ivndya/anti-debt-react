import { useState } from 'react';

export const useNumberPad = () => {
  const [amount, setAmount] = useState('0');

  const handleNumberPress = (num: string) => {
    if (amount === '0') {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
  };

  const handleDeletePress = () => {
    if (amount.length > 1) {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount('0');
    }
  };

  const resetAmount = () => {
    setAmount('0');
  };

  return { amount, resetAmount, handleNumberPress, handleDeletePress };
};
