import { DeleteIcon } from 'lucide-react';

const rows = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
];

export const NumberPad = ({ onNumberPress, onDelete }) => {
  return (
    <div className="flex flex-col gap-3">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-3">
          {row.map((num) => (
            <button
              key={num}
              onClick={() => onNumberPress(num)}
              className="flex-1 h-16 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg text-white text-2xl font-bold flex items-center justify-center cursor-pointer transition-all duration-200 
                hover:scale-105 hover:from-gray-600 hover:to-gray-800 active:scale-95"
            >
              {num}
            </button>
          ))}
        </div>
      ))}
      <div className="flex gap-3">
        <button
          onClick={() => onNumberPress('.')}
          className="flex-1 h-16 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg text-white text-2xl font-bold flex items-center justify-center cursor-pointer transition-all duration-200 
            hover:scale-105 hover:from-gray-600 hover:to-gray-800 active:scale-95"
        >
          .
        </button>

        <button
          onClick={() => onNumberPress('0')}
          className="flex-1 h-16 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg text-white text-2xl font-bold flex items-center justify-center cursor-pointer transition-all duration-200 
            hover:scale-105 hover:from-gray-600 hover:to-gray-800 active:scale-95"
        >
          0
        </button>

        <button
          onClick={onDelete}
          className="flex-1 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg text-white flex items-center justify-center cursor-pointer transition-all duration-200 
            hover:scale-105 active:scale-95"
        >
          <DeleteIcon size={28} />
        </button>
      </div>
    </div>
  );
};
