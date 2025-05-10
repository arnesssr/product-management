import { db } from '../config/database'
import type { Order, OrderItem } from '../types/order'

export const orderService = {
  async create(data: Omit<Order, 'id' | 'createdAt'>) {
    // Start transaction
    const client = await db.connect()
    try {
      await client.query('BEGIN')
      
      // Create order
      const { rows: [order] } = await client.query(
        `INSERT INTO orders (customer_name, customer_email, status, total)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [data.customerName, data.customerEmail, 'pending', data.total]
      )

      // Create order items
      for (const item of data.items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, quantity, price_at_time)
           VALUES ($1, $2, $3, $4)`,
          [order.id, item.productId, item.quantity, item.unitPrice]
        )
      }

      await client.query('COMMIT')
      return order
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  },

  async findById(id: string) {
    const { rows: [order] } = await db.query('SELECT * FROM orders WHERE id = $1', [id])
    if (!order) return null

    const { rows: items } = await db.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [id]
    )
    
    return { ...order, items }
  }
}
