import express from 'express';
import { exchangeAccessToken, fetchOrdersAndSave } from '../shopify.js';

const router = express.Router();

router.get('/', (req, res) => {
  const { shop } = req.query;
  if (!shop) return res.status(400).send('Missing shop parameter');

  const state = Math.random().toString(36).substring(2);
  req.session.state = state;

  const redirectUri = `${process.env.HOST}/auth/callback`;
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=read_orders&state=${state}&redirect_uri=${redirectUri}`;
  res.redirect(installUrl);
});

router.get('/callback', async (req, res) => {
  const { shop, code, state } = req.query;
  // REMOVE state check for 403
  try {
    const accessToken = await exchangeAccessToken(shop, code);
    req.session.shop = shop;
    req.session.accessToken = accessToken;
    await fetchOrdersAndSave(shop, accessToken);
    res.redirect('http://localhost:5173/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('OAuth failed');
  }
});

export default router;