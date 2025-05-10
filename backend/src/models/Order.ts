import { z } from 'zod'

export const OrderItemSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  productName: z.string(),
  quantity: z.number().positive(),
  unitPrice: z.number().positive(),
  subtotal: z.number().positive()
})

export const OrderSchema = z.object({
  id: z.string().uuid(),
  orderNumber: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  status: z.enum(['pending', 'processing', 'completed', 'cancelled']),
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded']),
  items: z.array(OrderItemSchema),
  subtotal: z.number().positive(),
  tax: z.number().min(0),
  total: z.number().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
  notes: z.string().optional()
})

export type Order = z.infer<typeof OrderSchema>
export type OrderItem = z.infer<typeof OrderItemSchema>
