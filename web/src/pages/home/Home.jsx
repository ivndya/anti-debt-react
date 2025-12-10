import { CategoryTabs } from '../../widgets/category-tabs/CategoryTabs';
import { NumberPad } from '../../widgets/number-pad/NumberPad';

export const Home = ({
  amount,
  categories,
  selectedCategory,
  onSelectCategory,
  onNumberPress,
  onDelete,
  onSave,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 w-full box-border">
      <div className="bg-[#2D2D2D] rounded-2xl p-6 mb-4">
        <div className="text-5xl font-bold text-center mb-6 text-white">{amount}</div>

        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />

        <NumberPad onNumberPress={onNumberPress} onDelete={onDelete} onSave={onSave} />

        <button
          onClick={onSave}
          className="w-full bg-[#3D3D3D] p-4 rounded-lg mt-4 border-none cursor-pointer transition-colors duration-200 hover:bg-[#4D4D4D]"
        >
          <span className="text-center text-lg font-semibold text-white">Сохранить</span>
        </button>
      </div>
    </div>
  );
};
