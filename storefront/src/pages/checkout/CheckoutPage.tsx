import React from 'react'
import { CheckoutForm } from "../../components/checkout/CheckoutForm"
import { OrderSummary } from "../../components/checkout/OrderSummary"

export function CheckoutPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
