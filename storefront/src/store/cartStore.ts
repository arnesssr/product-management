import { create } from 'zustand'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}

interface CartStore {
  items: CartItem[]
  addToCart: (productId: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addToCart: (productId) => set((state) => {
    const existingItem = state.items.find(item => item.id === productId)
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
    }
    // Temporary placeholder values - replace with actual product data
    const newItem: CartItem = {
      id: productId,
      name: "Product Name",
      price: 0,
      quantity: 1,
      imageUrl: ""
    }
    return {
      items: [...state.items, newItem]
    }
  }),

  removeFromCart: (productId) => set((state) => ({
    items: state.items.filter(item => item.id !== productId)
  })),

  updateQuantity: (productId, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    )
  })),

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    const items = get().items
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
}))
