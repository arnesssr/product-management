export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrls: string[];
  status: 'draft' | 'published' | 'archived';
  stock: number;
  createdAt: string;
  updatedAt: string;
  publishedToStorefront: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
}
