import { CategoryTabsProps } from '../../shared/types'

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex justify-around mb-6">
      {categories.map((cat, idx) => {
        const Icon = cat.icon
        const color = selectedCategory === idx ? cat.color : 'grey'
        const scale = selectedCategory === idx ? 'scale-120' : 'scale-100'

        return (
          <div className="flex flex-col items-center">
            <button
              key={idx}
              onClick={() => onSelectCategory(idx)}
              className={`flex items-center justify-center w-16 h-16 rounded-full cursor-pointer transition-transform duration-200 ease-in-out
              ${scale}`}
            >
              <Icon size={28} color={color} />
            </button>
            <span className="text-xs" style={{ color }}>
              {cat.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}
