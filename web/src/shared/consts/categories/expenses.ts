import { Category, CategoryMap } from '../../types';

export const EXPENSE_CATEGORIES: Category[] = [
  {
    id: 'food',
    name: 'Еда',
    color: '#FF9F43',
  },
  {
    id: 'transport',
    name: 'Транспорт',
    color: '#1E90FF',
  },
  {
    id: 'subscriptions',
    name: 'Подписки',
    color: '#9B59B6',
  },
  {
    id: 'entertainment',
    name: 'Развлечения',
    color: '#E74C3C',
  },
];

export const EXPENSE_CATEGORIES_MAP: CategoryMap = EXPENSE_CATEGORIES.reduce((acc, category) => {
  acc[category.id] = category;
  return acc;
}, {});
