import { DeleteIcon } from 'lucide-react';

const rows = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
];

export const NumberPad = ({ onNumberPress, onDelete }) => {
  return (
    <div className="flex flex-col gap-2">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-2">
          {row.map((num) => (
            <button
              key={num}
              onClick={() => onNumberPress(num)}
              className="flex-1 bg-black h-16 rounded-lg flex items-center justify-center border-none cursor-pointer transition-colors duration-200 hover:bg-gray-900"
            >
              <span className="text-white text-2xl font-bold">{num}</span>
            </button>
          ))}
        </div>
      ))}
      <div className="flex gap-2">
        <button
  onClick={() => onNumberPress('.')} // <-- добавить обработчик
  className="flex-1 bg-black h-16 rounded-lg flex items-center justify-center border-none cursor-pointer transition-colors duration-200 hover:bg-gray-900"
>
  <span className="text-white text-2xl font-bold">.</span>
</button>

        <button
          onClick={() => onNumberPress('0')}
          className="flex-1 bg-black h-16 rounded-lg flex items-center justify-center border-none cursor-pointer transition-colors duration-200 hover:bg-gray-900"
        >
          <span className="text-white text-2xl font-bold">0</span>
        </button>
        <button
          onClick={onDelete}
          className="flex-1 bg-black h-16 rounded-lg flex items-center justify-center border-none cursor-pointer transition-colors duration-200 hover:bg-gray-900"
        >
          <DeleteIcon size={28} color="white" />
        </button>
      </div>
    </div>
  );
};
