import React from "react"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { Separator } from "../ui/Separator"
import { useCartStore } from "../../store/cartStore"

export function OrderSummary() {
  const { items, getTotal } = useCartStore()
  
  const subtotal = getTotal()
  const shipping = 10.00
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Order Summary</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal ({items.length} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  )
}
