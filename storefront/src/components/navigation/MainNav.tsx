import { Link } from "react-router-dom"
import React from 'react'

export function MainNav() {
  return (
    <nav className="flex items-center gap-6">
      <Link to="/new-arrivals" className="text-sm hover:text-primary">New Arrivals</Link>
      <Link to="/best-sellers" className="text-sm hover:text-primary">Best Sellers</Link>
      <Link to="/categories" className="text-sm hover:text-primary">Categories</Link>
    </nav>
  )
}
