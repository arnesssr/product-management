import { z } from 'zod'

export const InventoryMovementSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  type: z.enum(['in', 'out', 'adjustment']),
  quantity: z.number(),
  notes: z.string().optional(),
  createdAt: z.string().datetime()
})

export const InventorySchema = z.object({
  productId: z.string().uuid(),
  currentStock: z.number().min(0),
  reservedStock: z.number().min(0),
  minimumStock: z.number().min(0),
  lastUpdated: z.string().datetime(),
  movements: z.array(InventoryMovementSchema)
})

export type Inventory = z.infer<typeof InventorySchema>
export type InventoryMovement = z.infer<typeof InventoryMovementSchema>
