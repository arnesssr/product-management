import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { StoreLayout } from './components/layout/StoreLayout'
import { HomePage } from './pages/home/HomePage'
import { ProductPage } from './pages/product/ProductPage'
import { CategoryPage } from './pages/category/CategoryPage'
import { CartPage } from './pages/cart/CartPage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'

export function StoreRoutes() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  )
}
