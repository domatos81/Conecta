export const PRODUCTS = ['ERP G5', 'HCM', 'TMS'] as const;
export type Product = typeof PRODUCTS[number];

export interface KnowledgeArticle {
  id: string;
  product: Product;
  module: string;
  title: string;
  summary: string;
  symptoms: string[];
  keywords: string[];
  steps: string[];
  note: string;
  version: string | null;
  sourceUrl: string;
  sourceCheckedAt: string;
}
