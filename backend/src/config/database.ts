import { Pool } from 'pg';

const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon DB
  },
  connectionTimeoutMillis: 5000, // 5 seconds timeout
  max: 20 // Maximum pool size
};

export const db = new Pool(poolConfig);

export async function dbConnect() {
  let client;
  try {
    client = await db.connect();
    await client.query('SELECT NOW()'); // Test query
    console.log('Database connected successfully');
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  } finally {
    if (client) {
      client.release(); // Ensure client is always released back to pool
    }
  }
}

// Handle pool errors
db.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Add cleanup on application shutdown
process.on('SIGINT', async () => {
  await db.end();
  process.exit(0);
});