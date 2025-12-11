import { Home, DollarSign, BarChart3 } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', icon: Home },
  { id: 'debts', icon: DollarSign },
  { id: 'stats', icon: BarChart3 },
];

export const BottomNav = ({ activeScreen, onChange }) => {
  return (
    <div className="flex bg-[#2D2D2D] rounded-t-3xl pt-4 pb-8 w-full box-border">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className="flex-1 flex justify-center bg-transparent border-none cursor-pointer"
        >
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-200 ${
              activeScreen === item.id ? 'bg-white' : 'bg-[#2D2D2D]'
            }`}
          >
            <item.icon size={24} color={activeScreen === item.id ? '#000' : '#fff'} />
          </div>
        </button>
      ))}
    </div>
  );
};
