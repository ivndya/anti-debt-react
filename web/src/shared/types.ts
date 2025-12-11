import { LucideIcon } from "lucide-react";

export interface Debt {
  id: number;
  amount: number;
  categoryId: string;
  lender: string;
  date: string;
  paid: boolean;
}

export interface Expense {
  id: number;
  amount: number;
  categoryId: string;
  description?: string;
  date: string;
}

export interface Income {
  id: number;
  amount: number;
  categoryId: string;
  source: string;
  date: string;
  comment?: string;
  recurring?: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: LucideIcon
}

export interface CategoryMap {
  [key: string]: Category;
}

export type TransactionType = 'expense' | 'income';
