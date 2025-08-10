// backend/routes/orders.js
import express from 'express';
import { pool } from '../db/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT 
        o.id AS order_id,
        o.shop,
        o.orderid,
        o.status,
        o.createdat,
        fi.returnid,
        fi.lineitemid,
        fi.qty,
        fi.reason,
        fi.imageurl
      FROM orders o
      LEFT JOIN fulfilment_items fi ON fi.returnid = o.id
      ORDER BY o.createdat DESC;
    `;

    const result = await pool.query(query);
    console.log(result);
    // Group orders with their images
    const ordersMap = {};
    result.rows.forEach(row => {
      if (!ordersMap[row.orderid]) {
        ordersMap[row.orderid] = {
          orderid: row.orderid,
          shop: row.shop,
          status: row.status,
          createdat: row.createdat,
          qty: row.qty,
          reason: row.reason,
          images: []
        };
      }
      if (row.imageurl) {
        ordersMap[row.orderid].images.push(row.imageurl);
      }
    });

    res.json(Object.values(ordersMap));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching orders');
  }
});

export default router;
