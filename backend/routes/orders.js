import express from 'express';
import { pool } from '../db/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const shop = req.session.shop;
  if (!shop) return res.status(401).send('Unauthorized');

  try {
    const result = await pool.query(
      `SELECT * FROM orders WHERE shop = $1 ORDER BY createdat DESC LIMIT 100`,
      [shop]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching orders');
  }
});

export default router;