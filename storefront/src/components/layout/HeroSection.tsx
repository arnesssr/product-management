import React from "react"
import { Button } from "../ui/Button"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16">
      <div className="container">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to our Store
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse our collection of quality products
          </p>
          <Button size="lg">Shop Now</Button>
        </div>
      </div>
    </section>
  )
}
