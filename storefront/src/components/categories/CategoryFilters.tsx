import React from 'react'
import { useStore } from "../../store/useStore"
import { Card } from "../ui/Card"
import { Label } from "../ui/Label"
import { Checkbox } from "../ui/Checkbox"
import { Separator } from "../ui/Separator"

interface CategoryFiltersProps {
  categoryId: string;
}
export function CategoryFilters({ categoryId }: CategoryFiltersProps) {
  const category = useStore((state) => 
    state.categories.find(c => c.id === categoryId)
  )
  if (!category) return null
  return (
    <Card className="p-4 space-y-4">
      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        {/* Price range filters will go here */}
      </div>
      <Separator />
      <div>
        <h3 className="font-medium mb-2">Availability</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="in-stock" />
            <Label htmlFor="in-stock">In Stock</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="on-sale" />
            <Label htmlFor="on-sale">On Sale</Label>
          </div>
        </div>
      </div>
      {/* Add more filter sections as needed */}
    </Card>
  )
}
