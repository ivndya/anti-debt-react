import { TransactionNumberPad } from './components/transcation-number-pad/TransactionNumberPad';

export const Home = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 w-full box-border">
      <TransactionNumberPad />
    </div>
  );
};
