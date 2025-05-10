import React from "react"
import { Outlet } from "react-router-dom"
import { StoreHeader } from "./StoreHeader"
import { StoreFooter } from "./StoreFooter"

export function StoreLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />
      <main className="flex-1 container py-8">
        <Outlet />
      </main>
      <StoreFooter />
    </div>
  )
}
