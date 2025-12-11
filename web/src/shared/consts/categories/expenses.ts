import { Category, CategoryMap } from '../../types'
import { Apple, Bus, Drama, Gamepad, Smartphone } from 'lucide-react'

export const EXPENSE_CATEGORIES: Category[] = [
  {
    id: 'food',
    name: 'Еда',
    color: '#FF9F43',
    icon: Apple,
  },
  {
    id: 'transport',
    name: 'Транспорт',
    color: '#1E90FF',
    icon: Bus,
  },
  {
    id: 'subscriptions',
    name: 'Подписки',
    color: '#9B59B6',
    icon: Smartphone,
  },
  {
    id: 'entertainment',
    name: 'Развлечения',
    color: '#E74C3C',
    icon: Drama,
  },
]

export const EXPENSE_CATEGORIES_MAP: CategoryMap = EXPENSE_CATEGORIES.reduce<CategoryMap>(
  (acc, category) => {
    acc[category.id] = category
    return acc
  },
  {},
)
