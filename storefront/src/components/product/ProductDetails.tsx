import React, { useState } from "react"
import { useStore } from "../../store/useStore"
import { Button } from "../ui/Button"
import { Card } from "../ui/Card"
import { Separator } from "../ui/Separator"
import { Badge } from "../ui/Badge"
import { ShoppingCart, Heart } from "lucide-react"
import { useCart } from "../../hooks/useCart"

interface ProductDetailsProps {
  productId: string
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()
  
  const product = useStore(state => 
    state.products.find(p => p.id === productId && p.status === 'published')
  )

  if (!product) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          Product not found or unavailable
        </div>
      </Card>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg border">
          <img
            src={product.imageUrls[selectedImage]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        
        {/* Thumbnail Images */}
        {product.imageUrls.length > 1 && (
          <div className="flex gap-4 overflow-auto pb-2">
            {product.imageUrls.map((url, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative aspect-square w-20 overflow-hidden rounded-md border ${
                  selectedImage === idx ? 'border-primary' : 'hover:border-primary/50'
                }`}
              >
                <img
                  src={url}
                  alt={`Product image ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
        </div>

        <p className="text-muted-foreground">{product.description}</p>

        <div className="space-y-4">
          <Button 
            className="w-full"
            size="lg"
            onClick={() => addToCart(product.id)}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
          
          <Button variant="outline" className="w-full">
            <Heart className="mr-2 h-5 w-5" />
            Add to Wishlist
          </Button>
        </div>
      </div>
    </div>
  )
}
