import { create } from 'zustand'

interface CartItem {
  id: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  addItem: (productId) => set((state) => {
    const item = state.items.find((i) => i.id === productId)
    if (item) {
      return {
        items: state.items.map((i) =>
          i.id === productId ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }
    }
    return { items: [...state.items, { id: productId, quantity: 1 }] }
  }),
  removeItem: (productId) => set((state) => ({
    items: state.items.filter((i) => i.id !== productId),
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    items: state.items.map((i) =>
      i.id === productId ? { ...i, quantity } : i
    ),
  })),
  clearCart: () => set({ items: [] }),
}))
