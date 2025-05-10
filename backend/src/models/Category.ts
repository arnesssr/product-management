import { z } from 'zod'

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  description: z.string(),
  imageUrl: z.string().url().optional(),
  parentId: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export type Category = z.infer<typeof CategorySchema>
