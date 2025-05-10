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
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}
