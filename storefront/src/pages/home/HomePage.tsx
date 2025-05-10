import React from "react"
import { HeroSection } from "../../components/layout/HeroSection"
import { Categories } from "../../components/categories/Categories"
import { FeaturedSection } from "../../components/featured/FeaturedSection"
import { ProductGrid } from "../../components/product/ProductGrid"

export function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Banner */}
      <HeroSection />

      {/* Categories */}
      <section className="container">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground mt-1">
              Browse our collections
            </p>
          </div>
        </div>
        <Categories />
      </section>

      {/* Featured Products */}
      <FeaturedSection />

      {/* New Arrivals */}
      <section className="container">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <p className="text-muted-foreground mt-1">
              Check out our latest products
            </p>
          </div>
        </div>
        <ProductGrid />
      </section>
    </div>
  )
}
