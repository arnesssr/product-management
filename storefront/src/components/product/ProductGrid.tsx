import React from "react"

interface ProductGridProps {
  featured?: boolean;
  category?: string;  // Add category prop
}

export function ProductGrid({ featured, category }: ProductGridProps) {
  // Get products from localStorage
  const products = JSON.parse(localStorage.getItem('storefront_products') || '[]')
  const filteredProducts = featured 
    ? products.filter((p: any) => p.featured) 
    : products.filter((p: any) => category ? p.category === category : true)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product: any) => (
        <div key={product.id} className="rounded-lg border bg-card p-4">
          <img 
            src={product.imageUrls[0]} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-md"
          />
          <div className="mt-4">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-muted-foreground mt-1">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
