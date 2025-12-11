import { BriefcaseBusiness, Smile, UserLock, UsersRound } from 'lucide-react';
import { Category, CategoryMap } from '../../types';

export const DEBT_CATEGORIES: Category[] = [
  {
    id: 'personal',
    name: 'Личные',
    color: '#FF6B6B',
    icon: UserLock
  },
  {
    id: 'family',
    name: 'Семья',
    color: '#4ECDC4',
    icon: UsersRound
    
  },
  {
    id: 'friends',
    name: 'Друзья',
    color: '#FFD93D',
    icon: Smile

  },
  {
    id: 'work',
    name: 'Работа',
    color: '#95E1D3',
    icon: BriefcaseBusiness

  },
];

export const DEBT_CATEGORIES_MAP: CategoryMap = DEBT_CATEGORIES.reduce((acc, category) => {
  acc[category.id] = category;
  return acc;
}, {});
