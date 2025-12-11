export const CategoryTabs = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex justify-around mb-6">
      {categories.map((cat, idx) => {
        const Icon = cat.icon;

        return (
          <button
            key={idx}
            onClick={() => onSelectCategory(idx)}
            className={`flex items-center justify-center w-16 h-16 rounded-full cursor-pointer transition-transform duration-200 ease-in-out
              ${selectedCategory === idx ? 'scale-110' : 'scale-100'}`}
            style={{
              backgroundColor: selectedCategory === idx ? cat.color : 'transparent',
              boxShadow: selectedCategory === idx ? '0 0 12px rgba(255,255,255,0.3)' : 'none',
            }}
          >
            <Icon size={28} color={selectedCategory === idx ? 'white' : cat.color} />
          </button>
        );
      })}
    </div>
  );
};
