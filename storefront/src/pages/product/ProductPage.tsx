import React from 'react'
import { useParams } from "react-router-dom"
import { ProductDetails } from "../../components/product/ProductDetails"
import { RelatedProducts } from "../../components/product/RelatedProducts"
import { Card } from "../../components/ui/Card"

export function ProductPage() {
  const { id } = useParams()
  
  return (
    <div className="container py-8 space-y-8">
      <ProductDetails productId={id!} />
      <RelatedProducts productId={id!} />
    </div>
  )
}
