import { Category, CategoryMap } from '../../types';

export const INCOME_CATEGORIES: Category[] = [
  {
    id: 'salary',
    name: 'Зарплата',
    color: '#4CAF50',
  },
  {
    id: 'freelance',
    name: 'Фриланс',
    color: '#2196F3',
  },
  {
    id: 'investments',
    name: 'Инвестиции',
    color: '#FFC107',
  },
  {
    id: 'gifts',
    name: 'Подарки',
    color: '#9C27B0',
  },
];

export const INCOME_CATEGORIES_MAP: CategoryMap = INCOME_CATEGORIES.reduce((acc, category) => {
  acc[category.id] = category;
  return acc;
}, {});
