import { create } from 'zustand'
import type { Product, Category } from '../types/productTypes'

interface StoreState {
  products: Product[]
  categories: Category[]
  cart: { productId: string; quantity: number }[]
  fetchProducts: () => Promise<void>
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  categories: [],
  cart: [],
  fetchProducts: async () => {
    // For now, fetch from localStorage
    const products = JSON.parse(localStorage.getItem('storefront_products') || '[]');
    set({ products });
  },
}))
