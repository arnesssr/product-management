import { Router } from 'express';
import { db } from '../config/database';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    const { rows } = await db.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

export default router;
