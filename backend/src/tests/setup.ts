import { db } from '../config/database'

beforeAll(async () => {
  // Ensure database connection
  await db.connect()
})

afterAll(async () => {
  // Close database connection
  await db.end()
})
