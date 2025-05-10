import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { dbConnect } from './config/database';

const app = express();

// Middleware
app.use(cors({
  origin: [
    process.env.PMS_URL || 'http://localhost:5173',    // PMS Frontend
    process.env.STOREFRONT_URL || 'http://localhost:3000'  // Storefront
  ],
  credentials: true
}));

app.use(bodyParser.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize database
dbConnect().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.error('Database connection failed:', err);
  process.exit(1);
});

export { app };
