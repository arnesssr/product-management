import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('5000'),
  DATABASE_URL: z.string(),
  PMS_URL: z.string().default('http://localhost:5173'),
  STOREFRONT_URL: z.string().default('http://localhost:3000'),
  API_KEY: z.string(),
});

try {
  envSchema.parse(process.env);
} catch (error) {
  console.error('Invalid environment variables:', error);
  process.exit(1);
}

export const config = {
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '5000', 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  cors: {
    origins: [process.env.PMS_URL, process.env.STOREFRONT_URL],
  },
  api: {
    key: process.env.API_KEY,
  },
} as const;
