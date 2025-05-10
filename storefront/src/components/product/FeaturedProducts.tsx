import React from 'react'
import { useStore } from "../../store/useStore"
import { ProductCard } from "./ProductCard"

export function FeaturedProducts() {
  // Get only published and featured products (first 4)
  const products = useStore(state => 
    state.products
      .filter(p => p.status === 'published')
      .slice(0, 4)
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product}
        />
      ))}
    </div>
  )
}
