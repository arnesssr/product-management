import React from "react"
import { Link } from "react-router-dom"

export function StoreNavigation() {
  return (
    <nav className="flex items-center gap-6">
      <Link to="/new-arrivals" className="text-sm hover:text-primary">New Arrivals</Link>
      <Link to="/best-sellers" className="text-sm hover:text-primary">Best Sellers</Link>
      <Link to="/special-offers" className="text-sm hover:text-primary">Special Offers</Link>
    </nav>
  )
}
