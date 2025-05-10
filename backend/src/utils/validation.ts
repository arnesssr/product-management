import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1).max(255),
  price: z.number().positive(),
  description: z.string(),
  category: z.string(),
  imageUrls: z.array(z.string().url()),
  status: z.enum(['draft', 'published', 'archived']),
  stock: z.number().min(0)
});

export const orderSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().positive(),
    variantId: z.string().uuid().optional()
  }))
});
