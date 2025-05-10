import { Request, Response, NextFunction } from 'express'
import { clerkClient } from '@clerk/clerk-sdk-node'

declare global {
  namespace Express {
    interface Request {
      user?: string
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key']
  const authHeader = req.headers.authorization

  try {
    // Check API key for Storefront requests
    if (apiKey === process.env.API_KEY) {
      return next()
    }

    // Check Clerk session for PMS requests
    if (authHeader) {
      const token = authHeader.split(' ')[1]
      const session = await clerkClient.sessions.getSession(token)
      if (session) {
        req.user = session.userId
        return next()
      }
    }

    res.status(401).json({ error: 'Unauthorized' })
  } catch (error) {
    console.error('Auth Error:', error)
    res.status(401).json({ error: 'Authentication failed' })
  }
}

export type AuthMiddleware = typeof auth
