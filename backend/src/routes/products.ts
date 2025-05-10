import { Router } from 'express'
import { db } from '../db/client'

const router = Router()

router.get('/', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM products WHERE status = $1', ['published'])
  res.json(rows)
})

router.post('/', async (req, res) => {
  const { name, price, description, category, imageUrls } = req.body
  const { rows } = await db.query(
    'INSERT INTO products (name, price, description, category, image_urls) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, price, description, category, imageUrls]
  )
  res.status(201).json(rows[0])
})

export { router as productRouter }
