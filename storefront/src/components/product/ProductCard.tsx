import React from 'react'
import { Link } from "react-router-dom"
import { Button } from "../ui/Button"
import { useCart } from "../../hooks/useCart"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrls: string[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <div className="group rounded-lg border bg-card">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <h3 className="font-medium mb-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          <Button 
            size="sm" 
            onClick={() => addToCart(product.id)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
