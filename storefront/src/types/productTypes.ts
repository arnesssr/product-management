export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrls: string[]
  category: string
  status: 'draft' | 'published' | 'archived'
  stock: number
  variants?: ProductVariant[]
  createdAt: string
  updatedAt: string
}

export interface ProductVariant {
  id: string
  name: string
  price: number
  stock: number
  sku: string
  attributes: Record<string, string>
}

export interface Category {
  id: string
  name: string
  description: string
  imageUrl?: string
  parentId?: string
}
