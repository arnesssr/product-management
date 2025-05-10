import { create } from 'zustand'

interface CartItem {
  id: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addToCart: (productId: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  getTotal: () => number
}

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addToCart: (productId) => {
    set(state => {
      const existing = state.items.find(item => item.id === productId)
      if (existing) {
        return {
          items: state.items.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      return { items: [...state.items, { id: productId, quantity: 1 }] }
    })
  },
  removeFromCart: (productId) => {
    set(state => ({
      items: state.items.filter(item => item.id !== productId)
    }))
  },
  updateQuantity: (productId, quantity) => {
    set(state => ({
      items: state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    }))
  },
  getTotal: () => {
    // Implement total calculation when we have product prices
    return 0
  }
}))

export const useCart = () => useCartStore()
