import { db } from '../config/database'
import type { Product } from '../types/product'

export const productService = {
  async findAll() {
    const { rows } = await db.query('SELECT * FROM products WHERE status = $1', ['published'])
    return rows
  },

  async findById(id: string) {
    const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id])
    return rows[0]
  },

  async create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const { rows } = await db.query(
      `INSERT INTO products (name, price, description, category, image_urls, status, stock)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [data.name, data.price, data.description, data.category, data.imageUrls, data.status, data.stock]
    )
    return rows[0]
  },

  async update(id: string, data: Partial<Product>) {
    const { rows } = await db.query(
      `UPDATE products SET 
       name = COALESCE($1, name),
       price = COALESCE($2, price),
       description = COALESCE($3, description),
       status = COALESCE($4, status),
       updated_at = NOW()
       WHERE id = $5 RETURNING *`,
      [data.name, data.price, data.description, data.status, id]
    )
    return rows[0]
  }
}
