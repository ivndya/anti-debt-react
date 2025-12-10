import { Category, CategoryMap } from '../../types';

export const DEBT_CATEGORIES: Category[] = [
  {
    id: 'personal',
    name: 'Личные',
    color: '#FF6B6B',
  },
  {
    id: 'family',
    name: 'Семья',
    color: '#4ECDC4',
  },
  {
    id: 'friends',
    name: 'Друзья',
    color: '#FFD93D',
  },
  {
    id: 'work',
    name: 'Работа',
    color: '#95E1D3',
  },
];

export const DEBT_CATEGORIES_MAP: CategoryMap = DEBT_CATEGORIES.reduce((acc, category) => {
  acc[category.id] = category;
  return acc;
}, {});
