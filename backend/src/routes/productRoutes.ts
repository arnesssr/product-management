import { Router } from 'express';
import { db } from '../config/database';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM products WHERE status = $1', ['published']);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { name, price, description, category, imageUrls } = req.body;
    const { rows } = await db.query(
      'INSERT INTO products (name, price, description, category, image_urls) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, price, description, category, imageUrls]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

export default router;
