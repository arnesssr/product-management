import React, { useState } from "react"
import { Card } from "../ui/Card"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import { useCartStore } from "../../store/cartStore"
import { useNavigate } from "react-router-dom"

export function CheckoutForm() {
  const navigate = useNavigate()
  const { clearCart } = useCartStore()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: ""
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process checkout
    clearCart()
    navigate("/success")
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="First Name"
            value={formData.firstName}
            onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            required
          />
          <Input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Street Address"
            value={formData.address.street}
            onChange={e => setFormData(prev => ({
              ...prev,
              address: { ...prev.address, street: e.target.value }
            }))}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="City"
              value={formData.address.city}
              onChange={e => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, city: e.target.value }
              }))}
              required
            />
            <Input
              placeholder="State"
              value={formData.address.state}
              onChange={e => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, state: e.target.value }
              }))}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Postal Code"
              value={formData.address.postalCode}
              onChange={e => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, postalCode: e.target.value }
              }))}
              required
            />
            <Input
              placeholder="Country"
              value={formData.address.country}
              onChange={e => setFormData(prev => ({
                ...prev,
                address: { ...prev.address, country: e.target.value }
              }))}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Place Order
        </Button>
      </form>
    </Card>
  )
}
