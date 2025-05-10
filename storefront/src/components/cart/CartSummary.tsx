import React from 'react'
import { useCartStore } from "../../store/cartStore"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { Separator } from "../ui/Separator"
import { useNavigate } from "react-router-dom"

export function CartSummary() {
  const { items, getTotal } = useCartStore()
  const navigate = useNavigate()
  
  const subtotal = getTotal()
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Order Summary</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal ({items.length} items)</span>
          <span>${subtotal.toFixed(2)}</span>
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
        <Button 
          className="w-full"
          onClick={() => navigate("/checkout")}
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </Button>
      </div>
    </Card>
  )
}
