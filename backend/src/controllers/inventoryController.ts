import { Request, Response } from 'express'
import { db } from '../config/database'

export const inventoryController = {
  async updateStock(req: Request, res: Response) {
    const { id } = req.params
    const { stock } = req.body
    
    try {
      const { rows } = await db.query(
        'UPDATE inventory SET stock = $1, updated_at = NOW() WHERE product_id = $2 RETURNING *',
        [stock, id]
      )
      res.json(rows[0])
    } catch (error) {
      console.error('Error updating inventory:', error)
      res.status(500).json({ error: 'Failed to update inventory' })
    }
  },

  async getProductStock(req: Request, res: Response) {
    const { id } = req.params
    try {
      const { rows } = await db.query(
        'SELECT * FROM inventory WHERE product_id = $1',
        [id]
      )
      res.json(rows[0])
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch inventory' })
    }
  }
}
