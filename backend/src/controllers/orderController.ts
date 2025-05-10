import { Request, Response } from 'express'
import { db } from '../config/database'

export const orderController = {
  async createOrder(req: Request, res: Response) {
    const { customerName, customerEmail, items, total } = req.body
    try {
      const { rows } = await db.query(
        'INSERT INTO orders (customer_name, customer_email, total, status) VALUES ($1, $2, $3, $4) RETURNING *',
        [customerName, customerEmail, total, 'pending']
      )
      const orderId = rows[0].id

      // Insert order items
      for (const item of items) {
        await db.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES ($1, $2, $3, $4)',
          [orderId, item.productId, item.quantity, item.price]
        )
      }

      res.status(201).json(rows[0])
    } catch (error) {
      console.error('Error creating order:', error)
      res.status(500).json({ error: 'Failed to create order' })
    }
  },

  async getOrders(req: Request, res: Response) {
    try {
      const { rows } = await db.query('SELECT * FROM orders ORDER BY created_at DESC')
      res.json(rows)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' })
    }
  }
}
