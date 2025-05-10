import React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/Sheet"
import { Button } from "../ui/Button"
import { Separator } from "../ui/Separator"
import { useCartStore } from "../../store/cartStore"
import { Minus, Plus, X } from "lucide-react"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, getTotal } = useCartStore()

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-16 w-16 rounded object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {items.length > 0 ? (
            <>
              <Separator />
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <Button className="w-full">
                Proceed to Checkout
              </Button>
            </>
          ) : (
            <p className="text-center text-muted-foreground">
              Your cart is empty
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
