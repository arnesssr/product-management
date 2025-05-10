import React from 'react'
import { Link } from "react-router-dom"

interface Category {
  id: string;
  name: string;
}

export function Categories() {
  // Get categories from localStorage
  const categories = JSON.parse(localStorage.getItem('storefront_categories') || '[]')

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category: Category) => (
        <Link
          key={category.id}
          to={`/category/${category.id}`}
          className="group relative aspect-square overflow-hidden rounded-lg bg-muted hover:bg-muted/80 transition-colors"
        >
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <h3 className="text-lg font-medium text-center">
              {category.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

