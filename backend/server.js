import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';          // <--- import cors here
import authRoutes from './routes/auth.js';
import ordersRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Add CORS middleware before your routes
app.use(cors({
  origin: 'http://localhost:5173',  // frontend URL (change if different)
  credentials: true                 // allow cookies/sessions to be sent
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,  // set true if using HTTPS (ngrok/production)
    httpOnly: true,
    sameSite: 'lax',
  }
}));

// Routes
app.use('/auth', authRoutes);
app.use('/orders', ordersRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
