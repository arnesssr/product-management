import { Request, Response } from 'express'
import { db } from '../config/database'

export const productController = {
  async getAllProducts(req: Request, res: Response) {
    try {
      const { rows } = await db.query('SELECT * FROM products WHERE status = $1', ['published'])
      res.json(rows)
    } catch (error) {
      console.error('Error fetching products:', error)
      res.status(500).json({ error: 'Failed to fetch products' })
    }
  },

  async createProduct(req: Request, res: Response) {
    const { name, price, description, category, imageUrls } = req.body
    try {
      const { rows } = await db.query(
        'INSERT INTO products (name, price, description, category, image_urls) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, price, description, category, imageUrls]
      )
      res.status(201).json(rows[0])
    } catch (error) {
      console.error('Error creating product:', error)
      res.status(500).json({ error: 'Failed to create product' })
    }
  },

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params
    try {
      const { rows } = await db.query(
        'UPDATE products SET name = $1, price = $2, description = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
        [req.body.name, req.body.price, req.body.description, id]
      )
      res.json(rows[0])
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' })
    }
  }
}
