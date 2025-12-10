export const Stats = ({ stats, healthIndex, healthLabel }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 w-full box-border">
      <div className="bg-[#2D2D2D] rounded-2xl p-4 mb-4">
        <div className="text-lg font-semibold mb-4 text-white">Месяц</div>

        <div className="bg-[#3D3D3D] h-48 rounded-xl mb-4 flex flex-col items-center justify-center">
          <div className="mt-4 w-full px-8 flex justify-around">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.newDebts}</div>
              <div className="text-xs text-gray-500">Новые</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.paidDebts}</div>
              <div className="text-xs text-gray-500">Погашено</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.totalAmount}</div>
              <div className="text-xs text-gray-500">Всего ₽</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="flex-1 h-12 rounded bg-green-400" />
          <div className="flex-1 h-12 rounded bg-red-400" />
        </div>

        <div className="bg-[#3D3D3D] p-3 rounded-lg">
          <div className="text-sm font-medium text-white">
            Индекс вашего финансового здоровья = {healthIndex}
          </div>
          <div className="text-xs text-gray-500 mt-1">{healthLabel}</div>
        </div>
      </div>

      <div className="bg-[#2D2D2D] rounded-2xl p-4">
        <div className="text-lg font-semibold mb-2 text-white">Транзакции</div>
        <div className="bg-[#3D3D3D] h-16 rounded-lg" />
        <div className="bg-[#3D3D3D] h-16 rounded-lg mt-2" />
      </div>
    </div>
  );
};
