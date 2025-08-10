import axios from 'axios';
import { pool } from './db/index.js';

export async function exchangeAccessToken(shop, code) {
  const response = await axios.post(`https://${shop}/admin/oauth/access_token`, {
    client_id: process.env.SHOPIFY_API_KEY,
    client_secret: process.env.SHOPIFY_API_SECRET,
    code,
  });
  return response.data.access_token;
}

export async function fetchOrdersAndSave(shop, accessToken) {
  const since = new Date();
  since.setDate(since.getDate() - 60);

  const query = `
  {
    orders(first: 50, query: "created_at:>=${since.toISOString()}") {
      edges {
        node {
          id
          name
          createdAt
          displayFulfillmentStatus
          lineItems(first: 10) {
            edges {
              node {
                id
                quantity
                name
                image {
                  originalSrc
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  const response = await axios.post(`https://${shop}/admin/api/2023-07/graphql.json`, { query }, {
    headers: { 'X-Shopify-Access-Token': accessToken },
  });

  if (!response.data || !response.data.data || !response.data.data.orders) {
    console.error('No orders data found in response:', response.data);
    return;
  }

  const orders = response.data.data.orders.edges.map(e => e.node);

  for (const order of orders) {
    const orderIdNum = parseInt(order.id.split('/').pop());
    const createdAtDate = new Date(order.createdAt);

    await pool.query(
      `INSERT INTO orders (shop, orderid, status, createdat) VALUES ($1, $2, $3, $4)
       ON CONFLICT (orderid) DO NOTHING`,
      [shop, orderIdNum, order.displayFulfillmentStatus || 'unfulfilled', createdAtDate]
    );

    for (const lineItemEdge of order.lineItems.edges) {
      const lineItem = lineItemEdge.node;
      const lineItemIdNum = parseInt(lineItem.id.split('/').pop());

      await pool.query(
        `INSERT INTO fulfilment_items (lineitemid, qty, reason, imageurl) VALUES ($1, $2, $3, $4)
         ON CONFLICT (lineitemid) DO NOTHING`,
        [lineItemIdNum, lineItem.quantity, null, lineItem.image ? lineItem.image.originalSrc : null]
      );

      if (lineItem.image && lineItem.image.originalSrc) {
        const res = await pool.query(
          `SELECT returnid FROM fulfilment_items WHERE lineitemid = $1`,
          [lineItemIdNum]
        );

        if (res.rows.length > 0) {
          const returnId = res.rows[0].returnid;
          await pool.query(
            `INSERT INTO images (imageurl, returnitemid) VALUES ($1, $2)
             ON CONFLICT (imageurl) DO NOTHING`,
            [lineItem.image.originalSrc, returnId]
          );
        }
      }
    }
  }
}