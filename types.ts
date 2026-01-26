import { LucideIcon } from 'lucide-react';

export enum Category {
  CORE = 'Sistemas Principais',
  ADMIN = 'Gestão de Acessos & TI',
  KNOWLEDGE = 'Conhecimento & Suporte'
}

export interface AccessTool {
  id: string;
  title: string;
  description: string;
  url: string;
  category: Category;
  icon: LucideIcon;
  badge?: string;
  colorClass: string;
}

export interface NewsItem {
  id: string;
  type: 'maintenance' | 'feature' | 'info';
  title: string;
  message: string;
  date: string;
}