import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  imageUrls: z.array(z.string().url()),
  status: z.enum(['draft', 'published', 'archived']),
  stock: z.number().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export type Product = z.infer<typeof ProductSchema>
