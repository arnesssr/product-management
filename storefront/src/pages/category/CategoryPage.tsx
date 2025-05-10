import React from 'react'
import { ProductGrid } from "../../components/product/ProductGrid"
import { CategoryFilters } from "../../components/categories/CategoryFilters"
import { useParams } from "react-router-dom"

export function CategoryPage() {
  const { id } = useParams()

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside>
          <CategoryFilters categoryId={id!} />
        </aside>
        <main className="lg:col-span-3">
          <ProductGrid featured={false} category={id} />
        </main>
      </div>
    </div>
  )
}
