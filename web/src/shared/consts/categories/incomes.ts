import { Gift, HandCoins, Monitor, TrendingUp } from 'lucide-react'
import { Category, CategoryMap } from '../../types'

export const INCOME_CATEGORIES: Category[] = [
  {
    id: 'salary',
    name: 'Зарплата',
    color: '#16A34A',
    icon: HandCoins,
  },
  {
    id: 'freelance',
    name: 'Фриланс',
    color: '#2196F3',
    icon: Monitor,
  },
  {
    id: 'investments',
    name: 'Инвестиции',
    color: '#FFC107',
    icon: TrendingUp,
  },
  {
    id: 'gifts',
    name: 'Подарки',
    color: '#9C27B0',
    icon: Gift,
  },
]

export const INCOME_CATEGORIES_MAP: CategoryMap = INCOME_CATEGORIES.reduce<CategoryMap>(
  (acc, category) => {
    acc[category.id] = category
    return acc
  },
  {},
)
