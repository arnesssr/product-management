import React from "react"
import { useCartStore } from "../../store/cartStore"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { Separator } from "../ui/Separator"
import { Minus, Plus, Trash2 } from "lucide-react"

export function CartDetails() {
  const { items, updateQuantity, removeFromCart } = useCartStore()

  if (items.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          Your cart is empty
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id}>
            <div className="flex items-start gap-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-20 w-20 rounded-md object-cover"
              />
              <div className="flex-1 space-y-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)}
                </p>
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
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Separator className="my-4" />
          </div>
        ))}
      </div>
    </Card>
  )
}
