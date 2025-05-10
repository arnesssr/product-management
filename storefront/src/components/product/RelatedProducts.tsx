import React from 'react'
import { useStore } from "../../store/useStore"
import { ProductCard } from "./ProductCard"

interface RelatedProductsProps {
  productId: string
}

export function RelatedProducts({ productId }: RelatedProductsProps) {
  const currentProduct = useStore(state => 
    state.products.find(p => p.id === productId)
  )

  const relatedProducts = useStore(state => 
    state.products
      .filter(p => 
        p.status === 'published' && 
        p.id !== productId && 
        p.category === currentProduct?.category
      )
      .slice(0, 4)
  )

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
          />
        ))}
      </div>
    </div>
  )
}

