import { db } from '../config/database'

export const inventoryService = {
  async updateStock(productId: string, quantity: number) {
    const { rows } = await db.query(
      `UPDATE inventory 
       SET stock = stock + $1, updated_at = NOW()
       WHERE product_id = $2 RETURNING *`,
      [quantity, productId]
    )
    return rows[0]
  },

  async getStock(productId: string) {
    const { rows } = await db.query(
      'SELECT * FROM inventory WHERE product_id = $1',
      [productId]
    )
    return rows[0]
  },

  async recordMovement(productId: string, quantity: number, type: 'in' | 'out', notes?: string) {
    const { rows } = await db.query(
      `INSERT INTO inventory_movements (product_id, quantity, type, notes)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [productId, quantity, type, notes]
    )
    return rows[0]
  }
}
