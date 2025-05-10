import { Request, Response } from 'express'
import { db } from '../config/database'

export const categoryController = {
  async getAllCategories(req: Request, res: Response) {
    try {
      const { rows } = await db.query('SELECT * FROM categories')
      res.json(rows)
    } catch (error) {
      console.error('Error fetching categories:', error)
      res.status(500).json({ error: 'Failed to fetch categories' })
    }
  },

  async createCategory(req: Request, res: Response) {
    const { name, description } = req.body
    try {
      const { rows } = await db.query(
        'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
      )
      res.status(201).json(rows[0])
    } catch (error) {
      res.status(500).json({ error: 'Failed to create category' })
    }
  }
}
