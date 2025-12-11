export const CategoryTabs = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex justify-around mb-6">
      {categories.map((cat, idx) => {
        const Icon = cat.icon;

        return (
          <div
            key={idx}
            onClick={() => onSelectCategory(idx)}
            className={`flex-1 mx-1 rounded-2xl py-4 flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out ${
              selectedCategory === idx ? 'scale-110' : 'scale-100'
            }`}
            style={{
              backgroundColor: selectedCategory === idx ? cat.color : '#3D3D3D',
              boxShadow: selectedCategory === idx ? '0 0 12px rgba(255,255,255,0.3)' : 'none',
            }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-black/20 transition-all duration-200">
              <Icon size={28} color="white" /> 
            </div>
          </div>
        );
      })}
    </div>
  );
};
