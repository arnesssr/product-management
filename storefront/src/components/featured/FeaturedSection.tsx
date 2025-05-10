import React from 'react'
import { useStorefrontProducts } from "../../hooks/useStorefrontProducts"
import { ProductCard } from "../product/ProductCard"

interface StorefrontProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrls: string[];
  status: 'active' | 'inactive';
  category: string;
}

export function FeaturedSection() {
  const { products } = useStorefrontProducts()
  const featuredProducts = products.filter(p => p.status === 'active').slice(0, 4)

  if (featuredProducts.length === 0) return null

  return (
    <section className="bg-muted/30 py-12">
      <div className="container">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground mt-1">Hand-picked favorites</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
